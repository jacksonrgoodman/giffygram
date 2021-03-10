import { usePostCollection } from "../data/DataManager.js"

export const Footer = () => {
    // HTML to be returned to GiffyGram component
    return `
        <div class="footer__item">
            Posts since <select id="yearSelection">
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
            </select>
           <span id="postCount">${usePostCollection.length}</span>
        </div>
    `
}