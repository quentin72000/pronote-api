const jsdom = require('jsdom');

const { getDOM, extractStart } = require('./api');
const educonnect = require('./generics/educonnect');

async function login(url, account, username, password)
{
    const jar = new jsdom.CookieJar();
    let dom = await getDOM({
        url: 'https://lycees.netocentre.fr/portail/f/welcome/normal/render.uP',
        jar
    });

    dom = await getDOM({
        url: dom.window.document.getElementById('portalCASLoginLink').href + '&idpId=parentEleveEN-IdP',
        jar
    });

    await educonnect({ dom, jar, url, account, username, password });

    return extractStart(await getDOM({ url: url + account.value + '.html', jar, asIs: true }));
}

module.exports = login;
