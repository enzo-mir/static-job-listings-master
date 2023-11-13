import userJobData from "./data.json" assert { type: "json" };
const filter = document.getElementById("filter");
const displayDataContainer = document.getElementById("containerJobs");

userJobData.map((elem) => {
  const element = document.createElement("div");
  element.classList.add("job");
  element.innerHTML = `
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
            <li>${elem.role}</li>
            <li>${elem.level}</li>
            ${elem.tools.length ? elem.tools.map((tool) => `<li>${tool}</li>`).join('') : ""}
            ${elem.languages.length ? elem.languages.map((language) => "<li>" + language + "</li>").join('') : ""}
        </ul>
    `;
  element.dataset.new = elem.new;
  element.dataset.featured = elem.featured;
  displayDataContainer.append(element);
});
