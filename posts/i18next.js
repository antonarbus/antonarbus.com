import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'i18next',
  date: '2023.10.19',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/js.png',
  desc: 'i18next',
  body: (
    <>
      <H>i18next</H>

      <ul>
        <li><Lnk path='https://www.i18next.com/overview/getting-started'>i18next</Lnk> is a package to translate a website</li>
      </ul>

      <H>Resources</H>

      <ul>
        <li>translations are kept in <Code>resources</Code> property</li>
        <li>usually translation files are kept in deferent files (objects)</li>
        <li>which makes its maintenance a bit difficult</li>
      </ul>

      <Code block jsx>{`
      i18next.init({
        resources: {
          en: {
            translation: {
              "key": "hello world"
            }
          },
          fi: {
            translation: {
              "key": "moi"
            }
          }
        }
      })
      `}</Code>

      <ul>
        <li>we may keep translations in one object </li>
        <li>and transform it to the required shape</li>
      </ul>

      <Code block jsx>{`
      const translationsInput = {
        nav: {
          key1: {
            en: "value 1 en",
            fi: "value 1 fi"
          },
          key2: {
            en: "value 2 en",
            fi: "value 2 fi"
          },
          someMenu: {
            key3: {
              en: "value 3 en",
              fi: "value 3 fi"
            },
            key4: {
              en: "value 4 en",
              fi: "value 4 fi"
            }
          }
        },
        form: {
          key5: {
            en: "value 5 en",
            fi: "value 5 fi"
          },
          key6: {
            en: "value 6 en",
            fi: "value 6 fi"
          }
        }
      }

      function processSection (section, lang) {
        const processed = {};
        for (let key in section) {
          if (
            typeof section[key] === 'object' &&
            typeof section[key][lang] === 'string'
          ) {
            processed[key] =  section[key][lang];
          } else {
            processed[key] = processSection(section[key], lang);
          }
        }

        return processed;
      }

      function convertTranslations (translations) {
        const result = {};
        ['en', 'fi'].forEach(lang => {
          result[lang] = {
            translation: processSection(translations, lang)
          };
        });
        return result;
      }

      // output
      en: {
        translation: {
          nav: {
            key1: 'value 1 en',
            key2: 'value 2 en',
            someMenu: {
              key3: 'value 3 en',
              key4: 'value 4 en'
            }
          },
          form: {
            key5: 'value 5 en',
            key6: 'value 6 en'
          },
        },
      },
      fi: {
        translation: {
          nav: {
            key1: 'value 1 fi',
            key2: 'value 2 fi',
            someMenu: {
              key3: 'value 3 fi',
              key4: 'value 4 fi'
            }
          },
          form: {
            key5: 'value 5 fi',
            key6: 'value 6 fi'
          }
        }
      },
      `}</Code>

    </>

  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
