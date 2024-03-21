document.addEventListener("DOMContentLoaded", function () {
    const articlesContainer = document.getElementById('newsContainer');
    articlesContainer.innerText = '';
    fetch('/data/latestNews.json')
        .then(response => response.json())
        .then(data => {
            // Reverse the array to get the latest articles first
            data.articles.reverse().slice(0, 5).forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.innerHTML = `
                <div class="box__section__content__headline">
                    <img class="box__section__content__headline__icon" src="${article.icon}" alt="news icon development">
                    <span class="box__section__content__headline__date">${article.date}</span>
                    <span class="box__section__content__headline__text">${article.title}</span>
                </div>
                <table class="box__section__content__table">
                    <tbody>
                        <tr>
                            <td>
                                <p>
                                    <img src=${article.capital} alt="">${article.firstLine}
                                </p>
                                <p>${article.content}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br>
            `;
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error loading articles:', error));
});