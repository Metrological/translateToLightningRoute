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


import sequence from './src/helpers/sequence'
import {parse, translate, ouput} from './src'

const defaultMapping = {
  'default' : 'Home',
  'params' : [
    'lmt', 'us_privacy',
  ],
  'remap' : {
    'launchpoint' : (deeplinkObj) =>  { deeplinkObj.launchpoint === 'section' ? obj.sectionName : obj.launchpoint) }
  },
  'pages' : [
    'section'
  ],
  'inputVariables' : [
    'query',
    ['assetType', 'assetId'],
    'entityId',
  ]
}

//https://www.tvapp.com/x1?launchpoint=home&lmt=0&us_privacy=1-N-
//https://www.tvapp.com/x1?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=home
//--> /home?(params)

//https://www.tvapp.com/x1?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=settings
//--> /settings

export default async (hashOrObject, config = {
    inputFormat: 'hash',
    outputFormat: 'url', // object,
    mapping : {
      ...defaultMapping
    }
}) => {

  const deepLinkObject = await parse(hashOrObject, config.inputFormat)
  const mappedDeeplinkObject = await translate(config.mapping, deepLinkObject)
  return await output(mappedDeeplinkObject, config.outputFormat)

}

// #/pages/:sectionName

// {
//     id: xx,
//     video: asd,
//     title: asdas
// }
