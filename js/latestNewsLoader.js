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
                <div class="news">
                    <img class="news__icon" src="${article.icon}" alt="news icon development">
                    <span class="news__date">${article.date}</span>
                    <span class="news__text"><b>${article.title}</b></span>
                </div>
                <table style="margin: 0 10px">
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