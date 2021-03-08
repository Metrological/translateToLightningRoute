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

import output from '../src/output'

describe('output method', () => {
  it('should transform a translated deeplink object to a hash', () => {
    const input = {
      queryParams: {},
      path: '/page/player/1234',
    }

    const expected = '#/page/player/1234'
    const actual = output(input, 'hash')

    expect(actual).to.deep.equal(expected)
  })

  it('should transform a translated deeplink object with queryParams to a querystring followed by a hash', () => {
    const input = {
      queryParams: { foo: 'bar', bla: 'bar' },
      path: '/page/player/1234',
    }

    const expected = '?foo=bar&bla=bar#/page/player/1234'
    const actual = output(input, 'hash')

    expect(actual).to.deep.equal(expected)
  })

  it('should default to translating to a hash ', () => {
    const input = {
      queryParams: {},
      path: '/page/player/1234',
    }

    const expected = '#/page/player/1234'
    const actual = output(input)

    expect(actual).to.deep.equal(expected)
  })

  it('should return the input when non-existing format is specified', () => {
    const input = {
      queryParams: { foo: 'bar', bla: 'bar' },
      path: '/page/player/1234',
    }

    const actual = output(input, 'non-existing-format')

    expect(actual).to.deep.equal(input)
  })
})
