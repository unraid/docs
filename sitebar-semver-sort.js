// Reverse the sidebar items ordering (including nested category items)
const semver = require("semver");

function getTitleFromItemId(id) {
  return id.split("/").at(-1);
}

function getSemverFromId(id) {
  try {
    return semver.parse(getTitleFromItemId(id));
  } catch (error) {
    return null;
  }
}

function addItemTitle(item) {
  return {
    ...item,
    label: getTitleFromItemId(item.id)
  };
}

function sortSidebarItems(items, sortBySemver = false) {
  const result = items.map((item) => {
    if (item.type === "category") {
      if (item.label.toLowerCase() === "release notes") {
        return { ...item, items: sortSidebarItems(item.items, true) };
      } else {
        return { ...item, items: sortSidebarItems(item.items, false) };
      }
    }
    return item;
  });

  if (sortBySemver) {
    const subfolderArrays = result.reduce((acc, item) => {
      const semverCompare = getSemverFromId(item.id);
      
      // Add null check for semverCompare
      if (!semverCompare) {
        console.warn(`Skipping invalid semver item: ${item.id}`);
        return acc;
      }

      const compareString = `${semverCompare.major}.${semverCompare.minor}`;
      acc[compareString] = acc[compareString] || [];
      acc[compareString].push(item);
      return acc;
    }, {});

    const subfolders = Object.entries(subfolderArrays)
      .map(([folderName, items]) => {
        const sortedSubfolder = items
          .map(addItemTitle)
          .sort((a, b) => {
            const aSemver = getSemverFromId(a.id) || semver.parse("0.0.0");
            const bSemver = getSemverFromId(b.id) || semver.parse("0.0.0");
            return semver.compare(aSemver, bSemver);
          });

        return {
          type: "category",
          label: folderName,
          items: sortedSubfolder,
        };
      })
      .sort((a, b) => {
        // Add fallback for invalid versions
        const aSemver = getSemverFromId(`${a.label}.0`) || semver.parse("0.0.0");
        const bSemver = getSemverFromId(`${b.label}.0`) || semver.parse("0.0.0");
        return semver.compare(bSemver, aSemver);
      });

    if (subfolders[0]) {
      subfolders[0].collapsed = false;
    }

    return subfolders;
  }
  return result;
}

module.exports = {
  sortSidebarItems,
};
