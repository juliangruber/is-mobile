const test = require('tape')
const describe = require('tape-describe')
const UserAgent = require('user-agents')
const isMobile = require('./')

const iphone =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
const chrome =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36'
const ffos = 'Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0'
const ipad =
  'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1'
const ios13ipad =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
const ios13ipadpro =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15'

test('is mobile', function (t) {
  t.ok(isMobile({ ua: iphone }))
  t.ok(isMobile({ ua: ffos }))
  t.notOk(isMobile({ ua: ipad }))
  t.ok(isMobile({ ua: ipad, tablet: true }))
  t.ok(isMobile({ ua: { headers: { 'user-agent': iphone } } }))
  t.notOk(isMobile({ ua: chrome }))
  t.notOk(isMobile({ ua: { headers: { 'user-agent': chrome } } }))
  t.notOk(isMobile())
  t.notOk(isMobile({ ua: { headers: null } }))
  t.notOk(isMobile({ ua: { headers: { 'user-agent': null } } }))

  global.navigator = {}

  global.navigator.userAgent = iphone
  t.ok(isMobile())
  t.ok(isMobile({ tablet: true }))

  global.navigator.userAgent = chrome
  t.notOk(isMobile())
  t.notOk(isMobile({ tablet: true }))

  global.navigator.userAgent = ipad
  t.notOk(isMobile())
  t.ok(isMobile({ tablet: true }))

  global.navigator = { maxTouchPoints: 5 }
  t.ok(isMobile({ ua: ios13ipad, tablet: true, featureDetect: true }))
  t.ok(isMobile({ ua: ios13ipadpro, tablet: true, featureDetect: true }))

  t.end()
})

describe('ua-bruteforce', function () {
  const limit = 300
  const checks = {
    mobile: { result: true },
    tablet: { result: true, tablet: true },
    desktop: { result: false }
  }
  const testCases = Object.entries(checks).reduce(
    (cases, [deviceCategory, { result, tablet }]) => [
      ...cases,
      ...new Array(limit).fill().map(() => ({
        ua: new UserAgent({ deviceCategory }).toString(),
        result,
        tablet
      }))
    ],
    []
  )

  testCases.forEach(({ ua, result, tablet }) => {
    test(ua, t => {
      t.equal(isMobile({ ua, tablet }), result)
      t.end()
    })
  })
})
