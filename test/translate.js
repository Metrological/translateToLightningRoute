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

import translate from '../src/translate'

const mapping = {
  normalize: {
    launchpoint: {
      to: 'section',
      fn: (val, deeplinkObj) => (val === 'section' ? deeplinkObj.sectionname : val),
    },
  },
  pathKey: 'section',
  paths: {
    playback: '/page/player/:assetId',
    browse: '/page/browse',
    search: '/search/:query?',
  },
  queryStringsToIgnore: ['section', 'sectionname'],
}

describe('translate method', () => {
  it('translate a deeplink object to a mapped deeplink object', () => {
    const input = {
      launchpoint: 'playback',
      assetId: '1234',
    }

    const expected = {
      queryParams: {},
      path: '/page/player/1234',
    }

    const actual = translate(input, mapping)
    expect(actual).to.deep.equal(expected)
  })

  it('should translate a deeplink object to a mapped deeplink object and remap sectionName to section', () => {
    const input = {
      launchpoint: 'section',
      sectionname: 'browse',
    }

    const expected = {
      queryParams: {},
      path: '/page/browse',
    }

    const actual = translate(input, mapping)
    expect(actual).to.deep.equal(expected)
  })

  it('should translate a deeplink object to a mapped deeplink object and remap sectionName to section', () => {
    const input = {
      launchpoint: 'section',
      sectionname: 'search',
      query: 'katy%20perry',
    }

    const expected = {
      queryParams: {},
      path: '/search/katy%20perry',
    }

    const actual = translate(input, mapping)
    expect(actual).to.deep.equal(expected)
  })

  it('should support optional path parts', () => {
    const input = {
      launchpoint: 'section',
      sectionname: 'search',
    }

    const expected = {
      queryParams: {},
      path: '/search',
    }

    const actual = translate(input, mapping)
    expect(actual).to.deep.equal(expected)
  })

  it('should fallback on the default mapping', () => {
    const input = {
      launchpoint: 'section',
      sectionname: 'search',
    }

    const expected = {
      queryParams: {},
      path: '/search',
    }

    const actual = translate(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should merge the custom mapping with the default mapping', () => {
    const input = {
      launchpoint: 'section',
      sectionname: 'search',
    }

    const customMapping = {
      paths: {
        search: '/mysearch/:query?',
      },
      queryStringsToIgnore: ['section'],
    }

    const expected = {
      queryParams: { sectionname: 'search' },
      path: '/mysearch',
    }

    const actual = translate(input, customMapping)
    expect(actual).to.deep.equal(expected)
  })

  it('should normalize a key to another string', () => {
    const input = {
      startpoint: 'home',
    }

    const customMapping = {
      normalize: {
        startpoint: {
          to: 'section',
        },
      },
      pathKey: 'section',
    }

    const expected = {
      queryParams: {},
      path: '/page/home',
    }

    const actual = translate(input, customMapping)
    expect(actual).to.deep.equal(expected)
  })
})
