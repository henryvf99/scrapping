import {$, $$} from "../utils/selectors.js"
import {profileSelectors} from "../config/scrapperSelector.js"
import axios from "axios"

function getToken(tokenKey){
    return document.cookie
    .split(';')
    .find(cookie => cookie.includes(tokenKey))
    .replace(tokenKey+'=','')
    .replaceAll('"','')
    .trim()
}

async function getContactInfo(){

    try {
        const token = getToken('JSESSIONID')
        
        const [contactInfoName] = $(profileSelectors.contactInfo).href.match(/in\/.+\/o/g) ?? []
        
        const contactInfoUrl = `https://www.linkedin.com/voyager/api/identity/profiles${contactInfoName.slice(2,-2)}/profileContactInfo`

        const { data: { data } } = await axios.get(contactInfoUrl, {
            headers: {
            accept: 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token': token
            }
        })
    return data

    } catch(error){
        console.log("error line 30", error);
    }
}

function getEspecificInfo(selector){
    const elements = $$(selector)
    const titles = []

    elements.forEach((listItem) => {
        const titleElement = $('span[aria-hidden]', listItem)
        titles.push(titleElement.textContent)
    })
    return titles
}

async function scrap (){

const name = $(profileSelectors.name).textContent

const experienceTitles = getEspecificInfo(profileSelectors.experiencesElements)

const educationTitles = getEspecificInfo(profileSelectors.educationElements)

const contactInfo = await getContactInfo()

const profile = {
    name,
    experienceTitles,
    educationTitles,
    contactInfo
}

console.log(profile);
   
}

scrap()