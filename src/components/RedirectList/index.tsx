import BrowserOnly from "@docusaurus/BrowserOnly";

import React, { useEffect, useState } from "react";

interface Redirect extends Object {
  to: string;
  from: string;
}

type ParsedRedirectObject = {
  golinks?: { redirects: Redirect[]; title: string; description: string };
  otherredirects?: { redirects: Redirect[]; title: string; description: string };
};
type Redirects = Redirect[];

export function RedirectListViewer() {
  const [redirects, setRedirects] = useState<ParsedRedirectObject>({
    golinks: {
      redirects: [],
      title: "Go Links",
      description: "Other websites should link to the Go Link specified in the Incoming Link column and the user will be redirected to the appropriate Destination.",
    },
    otherredirects: {
      redirects: [],
      title: "Other redirects",
      description: "To account for sites not using Go Links, the following redirects are in place to help users find the corrent content when the content at an 'Incoming Link' no longer exists. We recommend linking to Go Links whenever possible as they are much more granular.",
    },
  });

  function compareRedirect(a: Redirect, b: Redirect) {
    if (a.from < b.from) {
      return -1;
    } else if (a.from > b.from) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // the local docusaurus.config.js is not accessible, so use the production one from GitHub
        const response = await fetch("https://raw.githubusercontent.com/unraid/docs/main/docusaurus.config.js");
        const resText = await response.text();
        // get just the section that deals with redirects
        const resJson = resText.match(/redirects: (\[[^\]]*\])/m);
        const data: Redirect[] = eval(resJson[1]);
        const parsedRedirects = data.reduce<{
          golinks: Redirect[];
          otherredirects: Redirect[];
        }>(
          (acc, redirect) => {
            if (redirect.from.startsWith("/go/")) {
              // add trailing slash to go links
              // (when using Go Links, including the trailing slash will save an unnecessary redirect)
              if (redirect.from.charAt(redirect.from.length - 1) != "/") {
                redirect.from += "/";
              }
              acc.golinks.push(redirect);
            } else {
              acc.otherredirects.push(redirect);
            }
            return acc;
          },
          { golinks: [], otherredirects: [] }
        );

        setRedirects({
          ...(parsedRedirects.golinks.length
            ? {
                golinks: {
                  ...redirects.golinks,
                  redirects: parsedRedirects.golinks,
                },
              }
            : {}),
          ...(parsedRedirects.otherredirects.length
            ? {
                otherredirects: {
                  ...redirects.otherredirects,
                  redirects: parsedRedirects.otherredirects,
                },
              }
            : {}),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {Object.values(redirects).map(({ title, description, redirects }) => (
        <div
          key={title}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h2>{title}</h2>
          <p>{description}</p>
          <table>
            <thead>
              <th>Incoming Link</th>
              <th>Destination</th>
            </thead>
            <tbody>
              {redirects.sort(compareRedirect).map((redirect) => (
                <tr key={redirect.from}>
                  <td><a href={redirect.from}>{redirect.from}</a></td>
                  <td><a href={redirect.to}>{redirect.to}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export function RedirectList(props) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <RedirectListViewer />}
    </BrowserOnly>
  );
}
