---
title: Roadmap & Features
description: Current status and upcoming features for the Unraid API
sidebar_position: 10
---

# Roadmap & Features

:::info Development Status
This roadmap outlines completed and planned features for the Unraid API. Features and timelines may change based on development priorities and community feedback.
:::

## Feature Status Legend

| Status | Description |
|--------|-------------|
| ✅ **Done** | Feature is complete and available |
| 🚧 **In Progress** | Currently under active development |
| 📅 **Planned** | Scheduled for future development |
| 💡 **Under Consideration** | Being evaluated for future inclusion |

## Core Infrastructure

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **API Development Environment Improvements** | v4.0.0 |
| **Include API in Unraid OS** | Unraid v7.2-beta.1 |
| **Separate API from Connect Plugin** | Unraid v7.2-beta.1 |

### Upcoming Features 📅

| Feature | Target Timeline |
|---------|-----------------|
| **Make API Open Source** | Q1 2025 |
| **Developer Tools for Plugins** | Q2 2025 |

## Security & Authentication

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **Permissions System Rewrite** | v4.0.0 |
| **OIDC/SSO Support** | Unraid v7.2-beta.1 |

### In Development 🚧

- **User Interface Component Library** - Enhanced security components for the UI

## User Interface Improvements

### Planned Features 📅

| Feature | Target Timeline | Description |
|---------|-----------------|-------------|
| **New Settings Pages** | Q2 2025 | Modernized settings interface with improved UX |
| **Custom Theme Creator** | Q2-Q3 2025 | Allow users to create and share custom themes |
| **New Connect Settings Interface** | Q1 2025 | Redesigned Unraid Connect configuration |

## Array Management

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **Array Status Monitoring** | v4.0.0 |

### Planned Features 📅

| Feature | Target Timeline | Description |
|---------|-----------------|-------------|
| **Storage Pool Creation Interface** | Q2 2025 | Simplified pool creation workflow |
| **Storage Pool Status Interface** | Q2 2025 | Real-time pool health monitoring |

## Docker Integration

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **Docker Container Status Monitoring** | v4.0.0 |

### Planned Features 📅

| Feature | Target Timeline | Description |
|---------|-----------------|-------------|
| **New Docker Status Interface Design** | Q3 2025 | Modern container management UI |
| **New Docker Status Interface** | Q3 2025 | Implementation of new design |
| **Docker Container Setup Interface** | Q3 2025 | Streamlined container deployment |
| **Docker Compose Support** | TBD | Native docker-compose.yml support |

## Share Management

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **Array/Cache Share Status Monitoring** | v4.0.0 |

### Under Consideration 💡

- **Storage Share Creation & Settings** - Enhanced share configuration options
- **Storage Share Management Interface** - Unified share management dashboard

## Plugin System

### Planned Features 📅

| Feature | Target Timeline | Description |
|---------|-----------------|-------------|
| **New Plugins Interface** | Q3 2025 | Redesigned plugin management UI |
| **Plugin Management Interface** | TBD | Advanced plugin configuration |
| **Plugin Development Tools** | TBD | SDK and tooling for developers |

## Notifications

### Completed Features ✅

| Feature | Available Since |
|---------|-----------------|
| **Notifications System** | v4.0.0 |
| **Notifications Interface** | v4.0.0 |

---

## Recent Releases

:::info Full Release History
For a complete list of all releases, changelogs, and download links, visit the [Unraid API GitHub Releases](https://github.com/unraid/api/releases) page.
:::

### Unraid v7.2-beta.1 Highlights

- 🎉 **API included in Unraid OS** - Native integration
- 🔐 **OIDC/SSO Support** - Enterprise authentication
- 📦 **Standalone API** - Separated from Connect plugin

### v4.0.0 Highlights

- 🛡️ **Permissions System Rewrite** - Enhanced security
- 📊 **Comprehensive Monitoring** - Array, Docker, and Share status
- 🔔 **Notifications System** - Real-time alerts and notifications
- 🛠️ **Developer Environment** - Improved development tools

## Community Feedback

:::tip Have a Feature Request?
We value community input! Please submit feature requests and feedback through:

- [Unraid Forums](https://forums.unraid.net)
- [GitHub Issues](https://github.com/unraid/api/issues) - API is open source!

:::

## Version Support

| Unraid Version | API Version | Support Status |
|----------------|-------------|----------------|
| Unraid v7.2-beta.1+ | Latest | ✅ Active |
| 7.0 - 7.1.x | v4.x via Plugin | ⚠️ Limited |
| 6.12.x | v4.x via Plugin | ⚠️ Limited |
| < 6.12 | Not Supported | ❌ EOL |

:::warning Legacy Support
Versions prior to Unraid 7.2 require the API to be installed through the Unraid Connect plugin. Some features may not be available on older versions.
:::

:::tip Pre-release Versions
You can always install the Unraid Connect plugin to access pre-release versions of the API and get early access to new features before they're included in Unraid OS releases.
:::
