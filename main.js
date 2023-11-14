import userJobData from "./data.json" assert { type: "json" };
const filterPannel = document.getElementById("filter");
const displayDataContainer = document.getElementById("containerJobs");
var filterTable = {
  languages: [],
  tools: [],
  role: "",
  level: "",
};
let tableOfTags = [];

writeDataHtml();

function filterJobs(jobs, filters) {
  return jobs.filter((job) => {
    const languageFilter = filters.languages ? filters.languages.every((lang) => job.languages.includes(lang)) : true;
    const toolsFilter = filters.tools ? filters.tools.every((tool) => job.tools.includes(tool)) : true;
    const roleFilter = filters.role ? job.role === filters.role : true;
    const levelFilter = filters.level ? job.level === filters.level : true;

    return languageFilter && toolsFilter && roleFilter && levelFilter;
  });
}

function writeDataHtml() {
  var filteredJobs = null;
  if (filterTable.languages.length || filterTable.role.length || filterTable.tools.length || filterTable.level.length)
    filteredJobs = filterJobs(userJobData, filterTable);

  try {
    displayDataContainer.innerHTML = "";
    (filteredJobs || userJobData).map((elem) => {
      const element = document.createElement("div");
      element.classList.add("job");
      const elementTools = elem.tools.length ? elem.tools.map((tool) => `<li data-attribute="tool">${tool}</li>`).join("") : "";
      const elementLanguages = elem.languages.length
        ? elem.languages.map((language) => `<li data-attribute="languages">${language}</li>`).join("")
        : "";

      element.innerHTML += `
        <img src='${elem.logo}'/>
        <aside>
        <small>
        ${elem.company} 
        ${elem.new ? `<strong class="new">NEW!</strong>` : ""}
        ${elem.featured ? `<strong class="featured">FEATURED</strong>` : ""}
        </small>
        <p>${elem.position}</p>
        <sub><str>${elem.postedAt}</str> · <str>${elem.contract}</str> · <str>${elem.location}</str></sub>
        </aside>
        <ul>
        <li data-attribute="role">${elem.role}</li>
        <li data-attribute="level">${elem.level}</li>
        ${elementTools}
        ${elementLanguages}
        </ul>
        `;
      element.dataset.new = elem.new;
      element.dataset.featured = elem.featured;
      displayDataContainer.append(element);
    });
    return;
  } finally {
    displayDataContainer.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        addFilter(e.target.innerHTML, e.target.dataset.attribute);
      });
    });
  }
}

function addFilter(filter, attr) {
  filterPannel.innerHTML = "<p id='clear'>Clear</p>";

  let filterElement = document.createElement("ul");
  if (filter) {
    switch (attr) {
      case "role":
        filterTable.role = filter;
        break;
      case "tool":
        !filterTable.tools.includes(filter) ? filterTable.tools.push(filter) : null;

        break;
      case "languages":
        !filterTable.languages.includes(filter) ? filterTable.languages.push(filter) : null;

        break;
      case "level":
        filterTable.level = filter;
        break;
      default:
        break;
    }
    if (tableOfTags.length > 0) {
      tableOfTags.findIndex((e) => e.filter === filter) >= 0 ? null : tableOfTags.push({ filter, attr });
    } else {
      tableOfTags.push({ filter, attr });
    }
  }
  tableOfTags.map((tags) => {
    let li = document.createElement("li");
    let supprBtn = document.createElement("button");
    supprBtn.dataset.type = tags.attr;
    supprBtn.addEventListener("click", (e) => supprFilter(tags.filter, e.target.dataset.type));

    li.innerHTML = tags.filter;

    li.append(supprBtn);

    filterElement.append(li);
  });

  filterPannel.prepend(filterElement);
  clearFilter();
  writeDataHtml();
}

function supprFilter(filter, attr) {
  tableOfTags = tableOfTags.filter((x) => {
    return x.filter === filter ? false : true;
  });

  tableOfTags.length ? addFilter() : (filterPannel.innerHTML = "");
  switch (attr) {
    case "role":
      filterTable.role = "";
      break;
    case "tool":
      filterTable.tools.includes(filter) ? filterTable.tools.splice(filterTable.tools.indexOf(filter), 1) : null;

      break;
    case "languages":
      filterTable.languages.includes(filter) ? filterTable.languages.splice(filterTable.languages.indexOf(filter), 1) : null;

      break;
    case "level":
      filterTable.level = "";
      break;
    default:
      break;
  }
  writeDataHtml();
}

function clearFilter() {
  const clearParagraphe = document.getElementById("clear");
  clearParagraphe.addEventListener("click", () => {
    tableOfTags = [];
    filterPannel.innerHTML = "";
    filterTable = {
      languages: [],
      tools: [],
      role: "",
      level: "",
    };
    writeDataHtml();
  });
}
