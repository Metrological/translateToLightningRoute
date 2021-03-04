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


const defaultMapping = {
  'default' : 'Home',
  'remap' : {
    'launchpoint' : (val, deeplinkObj) =>  { val === 'section' ? deeplinkObj.sectionName : val }
  },
  'sections' :{
      'home': '/pages/home',
      'player': '/playingmodule',
      'bla': () => {}
  },
  'inputVariables' : [
    'query',
    ['assetType', 'assetId'],
    'entityId',
  ]
}

export default (input, mapping) => {
    //https://www.tvapp.com/x1?launchpoint=home&lmt=0&us_privacy=1-N-
    input = {
      'launchpoint' : 'home',
      'lmt' : '0',
      'us_privacy' : '1-N-'
    }

    // filter
    Object.keys(input).reduce((key, acc) => {
        const value = input[key]

        if (key in mapping.remap) {
          acc.section = mapping.remap[key](value, input) // function or string
        }

        if (section in mapping.sections) {
          acc.path = mapping.section[section] // function check
        }



        // we cant map it so pass it along
        acc.passthroughParams.push(value)
    }, {
       passthroughParams: [],
       section: '', // home, player, setting,
       page: '', // sectionName
       pageId:
    })


    {
      passThroughVariables: [],
      path: [
        'home'
        ':assetId',
        'xyz'
      ]
    }

    // /home (:id)

    // get input variables
    if (mapping.inputVariables)
      const inputVars = mapping.inputVariables.filter(i => {

      })

    // do something with input
    return output
}
