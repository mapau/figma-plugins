/** @jsx h */
import { h } from 'preact'
import classnames from '@sindresorhus/class-names'
import styles from './language-item.scss'

export function LanguageItem ({ isActive, onClick, children }) {
  return (
    <div
      class={classnames(
        styles.languageItem,
        isActive === true ? styles.isActive : null
      )}
      onClick={onClick}
    >
      {children}
      {isActive === true ? (
        <svg class={styles.icon}>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7.91107 10.8654L11.9111 6.36553L11.0889 5.63472L7.47645 9.69865L4.8889 7.11121L4.1111 7.88904L7.1111 10.8889L7.52355 11.3014L7.91107 10.8654Z'
          />
        </svg>
      ) : null}
    </div>
  )
}
