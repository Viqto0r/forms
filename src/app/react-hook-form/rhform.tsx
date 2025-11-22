'use client'

import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import styles from './rhform.module.css'

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
}

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: undefined as unknown as number,
  gender: 'male',
  interests: [],
  country: 'ru',
  newsletter: true,
  terms: false,
  bio: '',
  color: '#000000',
  date: '',
}

const onSubmit = async (data: FormValues) => {
  console.log('Form submitted:', data)
  alert('Форма отправлена!')
}

export const RHForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  })

  const formValues = watch()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>React Hook Form</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Основная информация</h3>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Имя *</label>
            <input
              {...register('firstName', {
                required: 'Обязательное поле',
              })}
              type="text"
              placeholder="Введите ваше имя"
              className={`${styles.input} ${
                errors.firstName ? styles.inputError : ''
              }`}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Фамилия *</label>
            <input
              {...register('lastName', {
                required: 'Обязательное поле',
              })}
              type="text"
              placeholder="Введите вашу фамилию"
              className={`${styles.input} ${
                errors.lastName ? styles.inputError : ''
              }`}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Email *</label>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес',
              },
            })}
            type="email"
            placeholder="your@email.com"
            className={`${styles.input} ${
              errors.email ? styles.inputError : ''
            }`}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Пароль *</label>
          <input
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
            type="password"
            placeholder="Не менее 6 символов"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ''
            }`}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Дополнительная информация</h3>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Возраст *</label>
            <input
              {...register('age', {
                required: 'Обязательное поле',
                min: {
                  value: 18,
                  message: 'Возраст должен быть не менее 18 лет',
                },
                max: {
                  value: 100,
                  message: 'Возраст должен быть не более 100 лет',
                },
                valueAsNumber: true,
              })}
              type="number"
              min="18"
              max="100"
              className={`${styles.input} ${
                errors.age ? styles.inputError : ''
              }`}
            />
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Дата рождения</label>
            <input {...register('date')} type="date" className={styles.input} />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Любимый цвет</label>
          <input
            {...register('color')}
            type="color"
            className={styles.colorInput}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Пол *</h3>
        <div className={styles.radioContainer}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Выберите пол' }}
            render={({ field }) => (
              <>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      {...field}
                      type="radio"
                      value="male"
                      checked={field.value === 'male'}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    Мужской
                  </label>
                </div>

                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      {...field}
                      type="radio"
                      value="female"
                      checked={field.value === 'female'}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    Женский
                  </label>
                </div>

                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      {...field}
                      type="radio"
                      value="other"
                      checked={field.value === 'other'}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    Другой
                  </label>
                </div>
              </>
            )}
          />
        </div>
        {errors.gender && (
          <span className={styles.error}>{errors.gender.message}</span>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Интересы *</h3>
        <div className={styles.checkboxContainer}>
          <Controller
            name="interests"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || 'Выберите хотя бы один интерес',
            }}
            render={({ field }) => (
              <>
                {['sports', 'music', 'reading', 'travel'].map((interest) => (
                  <div key={interest} className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={field.value.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, interest])
                          } else {
                            field.onChange(
                              field.value.filter(
                                (val: string) => val !== interest
                              )
                            )
                          }
                        }}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}></span>
                      {interest === 'sports' && 'Спорт'}
                      {interest === 'music' && 'Музыка'}
                      {interest === 'reading' && 'Чтение'}
                      {interest === 'travel' && 'Путешествия'}
                    </label>
                  </div>
                ))}
              </>
            )}
          />
        </div>
        {errors.interests && (
          <span className={styles.error}>{errors.interests.message}</span>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.group}>
          <label className={styles.label}>Страна *</label>
          <select
            {...register('country', {
              required: 'Выберите страну',
            })}
            className={`${styles.select} ${
              errors.country ? styles.selectError : ''
            }`}
          >
            <option value="">Выберите страну</option>
            <option value="ru">Россия</option>
            <option value="us">США</option>
            <option value="de">Германия</option>
            <option value="fr">Франция</option>
            <option value="jp">Япония</option>
          </select>
          {errors.country && (
            <span className={styles.error}>{errors.country.message}</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.group}>
          <label className={styles.label}>О себе *</label>
          <textarea
            {...register('bio', {
              required: 'Расскажите о себе',
              minLength: {
                value: 10,
                message: 'Расскажите о себе подробнее (минимум 10 символов)',
              },
            })}
            placeholder="Расскажите немного о себе..."
            rows={4}
            className={`${styles.textarea} ${
              errors.bio ? styles.textareaError : ''
            }`}
          />
          {errors.bio && (
            <span className={styles.error}>{errors.bio.message}</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register('newsletter')}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            Подписаться на рассылку
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register('terms', {
                required: 'Необходимо принять условия',
              })}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>Я принимаю условия
            соглашения *
          </label>
          {errors.terms && (
            <span className={styles.error}>{errors.terms.message}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={styles.submitBtn}
        >
          {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className={styles.resetBtn}
        >
          Сбросить
        </button>
      </div>

      <div className={styles.preview}>
        <h4 className={styles.previewTitle}>Предпросмотр данных:</h4>
        <pre className={styles.previewContent}>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </form>
  )
}
