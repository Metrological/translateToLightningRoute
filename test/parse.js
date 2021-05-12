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

import parse from '../src/parse'

describe('parse method', () => {
  it('should parse a url with a querystring to an object', () => {
    const input = 'https://myurl.com/uri/bla/foo?launchpoint=playback&assetId=1234'

    const expected = {
      launchpoint: 'playback',
      assetId: '1234',
    }
    const actual = parse(input, 'querystring')

    expect(actual).to.deep.equal(expected)
  })

  it('should parse just a querystring to an object', () => {
    const input = '?launchpoint=section&sectionName=search'

    const expected = {
      launchpoint: 'section',
      sectionName: 'search',
    }
    const actual = parse(input, 'querystring')

    expect(actual).to.deep.equal(expected)
  })

  it('should parse a url with a hash and a querystring to an object', () => {
    const input = 'https://myurl.com/uri/?launchpoint=section&sectionName=search#this-is-a-hash'

    const expected = {
      launchpoint: 'section',
      sectionName: 'search',
    }
    const actual = parse(input, 'querystring')

    expect(actual).to.deep.equal(expected)
  })

  it('should default to parsing a querystring', () => {
    const input = 'https://myurl.com/uri/bla/foo?launchpoint=detail&entityId=abcd-12356'

    const expected = {
      launchpoint: 'detail',
      entityId: 'abcd-12356',
    }
    const actual = parse(input)

    expect(actual).to.deep.equal(expected)
  })

  it('should return an empty object when non-existing format is specified', () => {
    const input = 'https://myurl.com/uri/bla/foo?launchpoint=detail&entityId=abcd-12356'

    const expected = {}
    const actual = parse(input, 'non-existing-format')

    expect(actual).to.deep.equal(expected)
  })
})
