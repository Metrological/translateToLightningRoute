/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2021 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'chai'

import translator from '../src/translator.js'

describe('lightning route translator', () => {
  it('should parse, transform and output ESPN / Comcast deeplinks to the correct lightning route', () => {
    const mapping = {
      paths: {
        featured: '/pages/featured',
        originals: '/pages/originals',
        browse: '/pages/browse',
        espnplus: '/pages/espnplus',
        search: '/search/:query?',
      },
    }

    const input = [
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=section&sectionName=featured',
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=section&sectionName=originals',
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=section&sectionName=browse',
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=section&sectionName=espnplus',
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=section&sectionName=search',
      'https://a.espncdn.com/connected-devices/espn-x1/?launchpoint=search&query=the%20search%20query',
      'https://a.espncdn.com/connected-devices/espn-x1/index.html?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=espnplus',
      '?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=espnplus#/page/espnplus',
    ]

    const expected = [
      '#/pages/featured',
      '#/pages/originals',
      '#/pages/browse',
      '#/pages/espnplus',
      '#/search',
      '#/search/the%20search%20query',
      '?lmt=0&us_privacy=1-N-#/pages/espnplus',
      '?lmt=0&us_privacy=1-N-#/pages/espnplus',
    ]

    const actual = input.map((deeplink) => {
      return translator(deeplink, {
        mapping,
      })
    })

    expect(actual).to.deep.equal(expected)
  })
})
