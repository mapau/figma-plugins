/** @jsx h */
import { Button } from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { LanguageItem } from './language-item'
import { translate } from '../../translate/translate'
import languages from '../../translate/languages'
import styles from './language-tester.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export function LanguageTester () {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    triggerEvent('SET_LANGUAGE', languageKey)
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    triggerEvent('RESET_LANGUAGE')
  }
  function handleKeyDown (event) {
    if (event.key === 'Escape') {
      triggerEvent('CLOSE')
    }
  }
  useEffect(function () {
    addEventListener('TRANSLATE_REQUEST', async function (
      layers,
      scope,
      languageKey,
      apiKey
    ) {
      const promises = layers.map(function ({ characters }) {
        return translate(characters, languageKey, apiKey)
      })
      const translated = await Promise.all(promises)
      const result = layers.map(function ({ id }, index) {
        return {
          id,
          characters: translated[index]
        }
      })
      triggerEvent('TRANSLATE_RESULT', result, scope, languageKey)
    })
  }, [])
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function () {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [activeLanguageKey]
  )
  const isResetButtonDisabled = activeLanguageKey === DEFAULT_LANGUAGE
  return (
    <div>
      <div class={styles.languages}>
        {Object.keys(languages).map(function (languageKey, index) {
          const isActive = activeLanguageKey === languageKey
          return (
            <LanguageItem
              key={index}
              isActive={isActive}
              onClick={
                isActive === false
                  ? handleLanguageClick.bind(null, languageKey)
                  : null
              }
            >
              {languages[languageKey]}
            </LanguageItem>
          )
        })}
      </div>
      <div class={styles.button}>
        <Button
          disabled={isResetButtonDisabled === true}
          fullWidth
          onClick={isResetButtonDisabled === true ? null : handleResetClick}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
