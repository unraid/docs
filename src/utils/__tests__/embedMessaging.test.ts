import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import {
  EMBED_MESSAGE_TYPES,
  createReadyMessage,
  postEmbedMessage,
  sendLegacyThemeMessage,
  subscribeToEmbedMessages,
} from "../embedMessaging";

const originalWindow = globalThis.window;

type Listener = (event: MessageEvent) => void;

type StubWindow = Window & {
  __listeners: Map<string, Set<Listener>>;
  parent: { postMessage: ReturnType<typeof vi.fn> } | Window;
};

function setStubWindow({ inIframe }: { inIframe: boolean }): { window: StubWindow; parentPostMessage: ReturnType<typeof vi.fn> } {
  const parentPostMessage = vi.fn();
  const listeners = new Map<string, Set<Listener>>();

  const stub: Partial<StubWindow> = {
    __listeners: listeners,
    addEventListener: (type: string, listener: EventListener): void => {
      const typedListener = listener as Listener;
      const collection = listeners.get(type) ?? new Set<Listener>();
      collection.add(typedListener);
      listeners.set(type, collection);
    },
    removeEventListener: (type: string, listener: EventListener): void => {
      const typedListener = listener as Listener;
      const collection = listeners.get(type);
      if (!collection) {
        return;
      }
      collection.delete(typedListener);
      if (collection.size === 0) {
        listeners.delete(type);
      }
    },
    postMessage: vi.fn(),
  };

  if (inIframe) {
    stub.parent = {
      postMessage: parentPostMessage,
    } as StubWindow["parent"];
  } else {
    // When not inside an iframe, window.parent === window.
    // We assign a placeholder and reconcile after we cast to Window.
    stub.parent = stub as unknown as Window;
  }

  const castStub = stub as StubWindow;
  if (!inIframe) {
    castStub.parent = castStub as unknown as Window;
  }

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: castStub,
  });

  return { window: castStub, parentPostMessage };
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  if (originalWindow) {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (globalThis as unknown as { window?: Window }).window;
  }
});

describe("postEmbedMessage", () => {
  it("posts to the parent window when inside an iframe", () => {
    const { parentPostMessage } = setStubWindow({ inIframe: true });

    postEmbedMessage(createReadyMessage("dark"));

    expect(parentPostMessage).toHaveBeenCalledWith(
      {
        source: "unraid-docs",
        type: EMBED_MESSAGE_TYPES.READY,
        theme: "dark",
      },
      "*",
    );
  });

  it("no-ops when the docs are not embedded", () => {
    const { parentPostMessage } = setStubWindow({ inIframe: false });

    postEmbedMessage(createReadyMessage("light"));

    expect(parentPostMessage).not.toHaveBeenCalled();
  });
});

describe("subscribeToEmbedMessages", () => {
  it("invokes the handler for new set-theme messages", () => {
    const { window } = setStubWindow({ inIframe: true });
    const handler = vi.fn();

    const unsubscribe = subscribeToEmbedMessages(handler);

    const listeners = window.__listeners.get("message");
    expect(listeners).toBeTruthy();

    const message = {
      data: {
        source: "unraid-docs",
        type: EMBED_MESSAGE_TYPES.SET_THEME,
        theme: "dark",
      },
    } as MessageEvent;

    listeners?.forEach((listener) => listener(message));

    expect(handler).toHaveBeenCalledWith({
      source: "unraid-docs",
      type: EMBED_MESSAGE_TYPES.SET_THEME,
      theme: "dark",
      legacy: undefined,
    });

    unsubscribe();
  });

  it("maps legacy theme-update messages into the new format", () => {
    const { window } = setStubWindow({ inIframe: true });
    const handler = vi.fn();

    subscribeToEmbedMessages(handler);

    const listeners = window.__listeners.get("message");

    const legacyEvent = {
      data: {
        type: "theme-update",
        theme: "LIGHT",
      },
    } as MessageEvent;

    listeners?.forEach((listener) => listener(legacyEvent));

    expect(handler).toHaveBeenCalledWith({
      source: "unraid-docs",
      type: EMBED_MESSAGE_TYPES.SET_THEME,
      theme: "light",
      legacy: true,
    });
  });
});

describe("sendLegacyThemeMessage", () => {
  it("re-emits the historical message types", () => {
    const { parentPostMessage } = setStubWindow({ inIframe: true });

    sendLegacyThemeMessage("theme-changed", "dark");

    expect(parentPostMessage).toHaveBeenCalledWith(
      {
        type: "theme-changed",
        theme: "dark",
      },
      "*",
    );
  });
});
