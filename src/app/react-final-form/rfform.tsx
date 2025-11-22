'use client'

import { FC } from 'react'
import { Field, Form } from 'react-final-form'
import styles from './rfform.module.css'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

interface IHobby {
  name?: string
  level?: string
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  age: number
  gender: string
  interests: string[]
  country: string
  newsletter: boolean
  terms: boolean
  bio: string
  color: string
  date: string
  hobbies: IHobby[]
}

const validate = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string | IHobby[]>> = {}

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле'
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле'
  }

  if (!values.email) {
    errors.email = 'Обязательное поле'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Некорректный email адрес'
  }

  if (!values.password) {
    errors.password = 'Обязательное поле'
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов'
  }

  if (!values.age) {
    errors.age = 'Обязательное поле'
  } else if (values.age < 18) {
    errors.age = 'Возраст должен быть не менее 18 лет'
  }

  if (!values.gender) {
    errors.gender = 'Выберите пол'
  }

  if (!values.interests || values.interests.length === 0) {
    errors.interests = 'Выберите хотя бы один интерес'
  }

  if (!values.country) {
    errors.country = 'Выберите страну'
  }

  if (!values.terms) {
    errors.terms = 'Необходимо принять условия'
  }

  if (!values.bio) {
    errors.bio = 'Расскажите о себе'
  } else if (values.bio.length < 10) {
    errors.bio = 'Расскажите о себе подробнее (минимум 10 символов)'
  }

  if (!values.hobbies || values.hobbies.length === 0) {
    errors.hobbies = 'Добавьте хотя бы одно хобби'
  } else {
    values.hobbies.forEach((hobby, index) => {
      if (!hobby.name) {
        errors.hobbies = errors.hobbies || []
        if (Array.isArray(errors.hobbies)) {
          errors.hobbies[index] = { name: 'Название хобби обязательно' }
        }
      }
    })
  }

  return errors
}

const onSubmit = async (values: FormValues) => {
  console.log('Form submitted:', values)
  alert('Форма отправлена!')
}

const initialValues = {
  gender: 'male',
  country: 'ru',
  newsletter: true,
  interests: [],
  hobbies: [{ name: '', level: 'beginner' }],
}

const mutators = { ...arrayMutators }

export const RFForm: FC = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      mutators={mutators}
      render={({ handleSubmit, submitting, pristine, values, form }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>React-final-form</h2>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Основная информация</h3>

            <div className={styles.row}>
              <Field name="firstName">
                {({ input, meta }) => (
                  <div className={styles.group}>
                    <label className={styles.label}>Имя *</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="Введите ваше имя"
                      className={`${styles.input} ${
                        meta.error && meta.touched ? styles.inputError : ''
                      }`}
                    />
                    {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Field name="lastName">
                {({ input, meta }) => (
                  <div className={styles.group}>
                    <label className={styles.label}>Фамилия *</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="Введите вашу фамилию"
                      className={`${styles.input} ${
                        meta.error && meta.touched ? styles.inputError : ''
                      }`}
                    />
                    {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <Field name="email">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Email *</label>
                  <input
                    {...input}
                    type="email"
                    placeholder="your@email.com"
                    className={`${styles.input} ${
                      meta.error && meta.touched ? styles.inputError : ''
                    }`}
                  />
                  {meta.error && meta.touched && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Пароль *</label>
                  <input
                    {...input}
                    type="password"
                    placeholder="Не менее 6 символов"
                    className={`${styles.input} ${
                      meta.error && meta.touched ? styles.inputError : ''
                    }`}
                  />
                  {meta.error && meta.touched && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Дополнительная информация</h3>

            <div className={styles.row}>
              <Field
                name="age"
                parse={(value) => (value ? parseInt(value, 10) : undefined)}
              >
                {({ input, meta }) => (
                  <div className={styles.group}>
                    <label className={styles.label}>Возраст *</label>
                    <input
                      {...input}
                      type="number"
                      min="18"
                      max="100"
                      value={input.value || ''}
                      className={`${styles.input} ${
                        meta.error && meta.touched ? styles.inputError : ''
                      }`}
                    />
                    {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Field name="date">
                {({ input, meta }) => (
                  <div className={styles.group}>
                    <label className={styles.label}>Дата рождения</label>
                    <input
                      {...input}
                      type="date"
                      className={`${styles.input} ${
                        meta.error && meta.touched ? styles.inputError : ''
                      }`}
                    />
                    {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <Field name="color">
              {({ input }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Любимый цвет</label>
                  <input
                    {...input}
                    type="color"
                    className={styles.colorInput}
                  />
                </div>
              )}
            </Field>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Пол *</h3>
            <div className={styles.radioContainer}>
              <Field name="gender" type="radio" value="male">
                {({ input }) => (
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        {...input}
                        type="radio"
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom}></span>
                      Мужской
                    </label>
                  </div>
                )}
              </Field>

              <Field name="gender" type="radio" value="female">
                {({ input }) => (
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        {...input}
                        type="radio"
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom}></span>
                      Женский
                    </label>
                  </div>
                )}
              </Field>

              <Field name="gender" type="radio" value="other">
                {({ input }) => (
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        {...input}
                        type="radio"
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom}></span>
                      Другой
                    </label>
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Интересы *</h3>
            <div className={styles.checkboxContainer}>
              <Field name="interests" type="checkbox" value="sports">
                {({ input }) => (
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        {...input}
                        type="checkbox"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}></span>
                      Спорт
                    </label>
                  </div>
                )}
              </Field>

              <Field name="interests" type="checkbox" value="music">
                {({ input }) => (
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        {...input}
                        type="checkbox"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}></span>
                      Музыка
                    </label>
                  </div>
                )}
              </Field>

              <Field name="interests" type="checkbox" value="reading">
                {({ input }) => (
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        {...input}
                        type="checkbox"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}></span>
                      Чтение
                    </label>
                  </div>
                )}
              </Field>

              <Field name="interests" type="checkbox" value="travel">
                {({ input }) => (
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        {...input}
                        type="checkbox"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}></span>
                      Путешествия
                    </label>
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className={styles.section}>
            <Field name="country">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Страна *</label>
                  <select
                    {...input}
                    className={`${styles.select} ${
                      meta.error && meta.touched ? styles.selectError : ''
                    }`}
                  >
                    <option value="">Выберите страну</option>
                    <option value="ru">Россия</option>
                    <option value="us">США</option>
                    <option value="de">Германия</option>
                    <option value="fr">Франция</option>
                    <option value="jp">Япония</option>
                  </select>
                  {meta.error && meta.touched && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.section}>
            <Field name="bio">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>О себе *</label>
                  <textarea
                    {...input}
                    placeholder="Расскажите немного о себе..."
                    rows={4}
                    className={`${styles.textarea} ${
                      meta.error && meta.touched ? styles.textareaError : ''
                    }`}
                  />
                  {meta.error && meta.touched && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Хобби *</h3>

            <FieldArray name="hobbies">
              {({ fields }) => (
                <div className={styles.arrayContainer}>
                  {fields.map((name, index) => (
                    <div key={name} className={styles.arrayItem}>
                      <div className={styles.arrayRow}>
                        <Field name={`${name}.name`}>
                          {({ input, meta }) => (
                            <div className={styles.group}>
                              <label className={styles.label}>
                                Название хобби
                              </label>
                              <input
                                {...input}
                                type="text"
                                placeholder="Например: Программирование"
                                className={`${styles.input} ${
                                  meta.error && meta.touched
                                    ? styles.inputError
                                    : ''
                                }`}
                              />
                              {meta.error && meta.touched && (
                                <span className={styles.error}>
                                  {meta.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name={`${name}.level`}>
                          {({ input }) => (
                            <div className={styles.group}>
                              <label className={styles.label}>Уровень</label>
                              <select {...input} className={styles.select}>
                                <option value="beginner">Начинающий</option>
                                <option value="intermediate">Средний</option>
                                <option value="advanced">Продвинутый</option>
                                <option value="expert">Эксперт</option>
                              </select>
                            </div>
                          )}
                        </Field>

                        <button
                          type="button"
                          onClick={() => fields.remove(index)}
                          className={styles.removeButton}
                          disabled={fields.length === 1}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className={styles.arrayActions}>
                    <button
                      type="button"
                      onClick={() =>
                        fields.push({ name: '', level: 'beginner' })
                      }
                      className={styles.addButton}
                    >
                      + Добавить хобби
                    </button>
                  </div>

                  {/* Общая ошибка для массива */}
                  <Field
                    name="hobbies"
                    subscription={{ error: true, touched: true }}
                  >
                    {({ meta: { error, touched } }) =>
                      error && touched && typeof error === 'string' ? (
                        <span className={styles.error}>{error}</span>
                      ) : null
                    }
                  </Field>
                </div>
              )}
            </FieldArray>
          </div>

          <div className={styles.section}>
            <Field name="newsletter" type="checkbox">
              {({ input }) => (
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      {...input}
                      type="checkbox"
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxCustom}></span>
                    Подписаться на рассылку
                  </label>
                </div>
              )}
            </Field>

            <Field name="terms" type="checkbox">
              {({ input, meta }) => (
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      {...input}
                      type="checkbox"
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxCustom}></span>Я принимаю
                    условия соглашения *
                  </label>
                  {meta.error && meta.touched && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={submitting || pristine}
              className={styles.submitBtn}
            >
              {submitting ? 'Отправка...' : 'Зарегистрироваться'}
            </button>

            <button
              type="button"
              onClick={() => form.reset()}
              className={styles.resetBtn}
            >
              Сбросить
            </button>
          </div>

          <div className={styles.preview}>
            <h4 className={styles.previewTitle}>Предпросмотр данных:</h4>
            <pre className={styles.previewContent}>
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        </form>
      )}
    />
  )
}
