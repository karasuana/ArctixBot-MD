import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': '𝑬𝑪𝑯𝑨𝑹𝑹𝑨𝑫𝑰♡︎ 𝗕𝗢𝗧 𝗠𝗔𝗜𝗡',
  'game': '𝗚𝗔𝗠𝗘',
  'rpg': '𝗥𝗣𝗚 𝗚𝗔𝗠𝗘𝗦',
  'xp': '𝗫𝗣 & 𝗟𝗜𝗠𝗜𝗧',
  'sticker': '𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
  'kerang': '𝗞𝗘𝗥𝗔𝗡𝗚',
  'quotes': '𝗤𝗢𝗨𝗧𝗘𝗦',
  'group': '𝗚𝗥𝗢𝗨𝗣',
  'internet': '𝗜𝗡𝗧𝗘𝗥𝗡𝗘𝗧',
  'anonymous': '𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦 𝗖𝗛𝗔𝗧',
  'nulis': '𝗟𝗢𝗚𝗢 𝗠𝗔𝗞𝗘𝗥',
  'anime': '𝗔𝗡𝗜𝗠𝗘',
  'nsfw': '𝗡𝗦𝗙',
  'downloader': '𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥',
  'tools': '𝗧𝗢𝗢𝗟𝗦',
  'fun': '𝗙𝗨𝗡',
  'quran': '𝗔𝗜',
  'owner': '𝗢𝗪𝗡𝗘𝗥',
  'info': '𝗜𝗡𝗙𝗢',
}
const defaultMenu = {
  before: `
╭─━━━❰𝐸𝐶𝐻𝐴𝑅𝑅𝐴𝐷𝐼 <3 🖤❱
┃ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝐄𝐂𝐇𝐀𝐑𝐑𝐀𝐃𝐈 𝐁𝐎𝐓
┖━━━━━━━━━━━━━━━⦂

╭━━━━❰ 𝗨𝗦𝗘𝗥 ❱
┃ 🗿 𝗟𝗜𝗠𝗜𝗧 : *%limit Limit*
┃ 🗿 𝗥𝗢𝗟𝗘 : *%role*
┃ 🗿 𝗟𝗘𝗩𝗘𝗟 : *%level (%exp / %maxexp)*
┃ 🗿 𝗧𝗢𝗧𝗔𝗟 𝗫𝗣 : %totalexp ✨
┃ 
┃ 🌍 𝗗𝗔𝗧𝗘: *%date*
┃ 🌍 𝗧𝗜𝗠𝗘: *%time*
┃
┃ 🎲 𝗨𝗣𝗧𝗜𝗠𝗘: *%uptime (%muptime)*
┃ 🎲 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘: %rtotalreg of %totalreg
┗━━━━━━━━━━━━━━━━⦂
%readmore`.trimStart(),
  header: '╭━━━❰ %category ❱',
  body: '┃ ⚜️ %cmd %islimit %isPremium',
  footer: '╰━━━━━━━⦂\n',
  after: `
𝐄𝐂𝐇𝐀𝐑𝐑𝐀𝐃𝐈 ♡︎☻︎ 𝐁𝐎𝐓 𝐈𝐍𝐂 |©𝐒𝐢𝐛𝐬𝐬𝐬𝐬𝐬𝐬𝐬𝐬
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long', timeZone: 'Asia/Kolkata' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => './src/avatar_contact.png')
    conn.sendHydrated(m.chat, text.trim(), author, pp, 'https://www.instagram.com/sibssssssss', 'INSTAGRAM', owner[0][0], 'OWNER', [
      ['BOTGROUP', '/donasi'],
      ['SPEED', '/ping'],
      ['OWNER', '/owner']
    ], m, { asLocation: 1 })
  } catch (e) {
    conn.reply(m.chat, 'My friend, menu  error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|m|help|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
