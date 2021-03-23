export const Footer = (postObj) => {
    // HTML to be returned to GiffyGram component
    return `
        <div class="footer__item">
            Posts since <select id="yearSelection">
                <option>2021</option>
                <option>2020</option>
            </select>
           <span id="postCount">0</span>
        </div>
    `
}