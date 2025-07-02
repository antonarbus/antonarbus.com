import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'react hook form',
  date: '2025.06.25',
  tags: ['form', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'react hook form',
  body: (
    <>
      <Code block jsx>{`
      // FormPlaygroundProvider.tsx

      import { zodResolver } from '@hookform/resolvers/zod'
      import { FormProvider, useForm } from 'react-hook-form'
      import {
        formPlaygroundSchema,
        type OutputFormValues,
        type InputFormValues,
      } from './formPlaygroundSchema'

      type Props = {
        children: React.ReactNode
      }

      /** React Hook Form provider connected to zod schema */
      export const FormPlaygroundProvider = (props: Props): React.JSX.Element => {
        const schema = formPlaygroundSchema.check((ctx) => {
          // Inside check() we may validate schema based on external data
          const apiResponse = {
            text: 'hello',
          }

          if (!ctx.value.textarea.toLowerCase().includes(apiResponse.text)) {
            ctx.issues.push({
              code: 'custom',
              message: \`Should contain "hello" text from api response\`,
              input: ctx.value, // original failed value at schema.safeParse() output for debugging
              path: ['textarea'], // ["foo","bar","baz"] → ctx.value.foo.bar.baz
              continue: true, // without "true" check stops
            })
          }
        })

        const formMethods = useForm<InputFormValues, unknown, OutputFormValues>({
          resolver: zodResolver(schema),
          defaultValues: {
            input: 'input',
            autocomplete: 'autocomplete',
            autocompleteWithFreeText: 'autocompleteWithFreeText',
            textarea: 'textarea',
            date: new Date(),
            checkbox: false,
            select: '',
            toggle: true,
          },
        })

        return <FormProvider {...formMethods}>{props.children}</FormProvider>
      }

    `}</Code>

      <Code block jsx>{`
        // formPlaygroundSchema.ts

        import { z, type ZodType } from 'zod/v4'

        const zStringNotEmpty = z.string().trim().min(1, { error: 'Error message' })

        const zDate = z.date({ error: 'Error message' })

        const zTrue: ZodType<true, boolean> = z.preprocess(
          (val) => val,
          z.literal(true, { error: 'Should be checked' }),
        )

        export const formPlaygroundSchema = z
          .object({
            input: zStringNotEmpty,
            autocomplete: zStringNotEmpty,
            autocompleteWithFreeText: zStringNotEmpty,
            textarea: zStringNotEmpty,
            date: zDate,
            checkbox: zTrue,
            select: zStringNotEmpty,
            toggle: z.boolean(),
          })
          .required()
          .check((ctx) => {
            // Here we may perform complex validation based on any value from the schema

            if (ctx.value.input.length > ctx.value.textarea.length) {
              ctx.issues.push({
                code: 'custom',
                message: 'Input text should be shorter than textarea text',
                input: ctx.value, // original failed value at schema.safeParse() output for debugging
                path: ['input'], // ["foo","bar","baz"] → ctx.value.foo.bar.baz
                continue: true, // without "true" check stops
              })

              ctx.issues.push({
                code: 'custom',
                message: 'Textarea text should be longer than input text',
                input: ctx.value,
                path: ['textarea'],
                continue: true,
              })
            }
          })

        export type InputFormValues = z.input<typeof formPlaygroundSchema>
        export type OutputFormValues = z.infer<typeof formPlaygroundSchema>

      `}</Code>

      <Code block jsx>{`
        // useFormPlayground.tsx

        /* eslint-disable @typescript-eslint/explicit-function-return-type */
        import { useFormContext } from 'react-hook-form'
        import type { InputFormValues, OutputFormValues } from './formPlaygroundSchema'

        /** Returns typed { formMethods } for the form */
        export const useFormPlayground = () => {
          const formMethods = useFormContext<
            InputFormValues,
            unknown,
            OutputFormValues
          >()

          return { formMethods }
        }
      `}</Code>

      <Code block jsx>{`
        // FormContent.tsx

        import { Box } from '@mui/material'
        import { useCallback } from 'react'
        import type { SubmitHandler } from 'react-hook-form'
        import { useTranslation } from 'react-i18next'
        import { useRevalidationOnChangeAfterSubmit } from '@src/shared/libs/react-hook-form/useRevalidationOnChangeAfterSubmit'
        import { useFormPlayground } from '../form-config/useFormPlayground'
        import type { OutputFormValues } from '../form-config/formPlaygroundSchema'
        import {
          AutocompleteControlled,
          AutocompleteWithFreeTextControlled,
          CheckboxControlled,
          DateControlled,
          InputControlled,
          SelectControlled,
          RowForInputFields,
          ToggleControlled,
        } from '@src/shared/components/input-field-controlled'

        export const FormContent = (): React.JSX.Element => {
          const { t } = useTranslation()
          const { formMethods } = useFormPlayground()
          useRevalidationOnChangeAfterSubmit()

          const onSubmit = useCallback((e: React.FormEvent): void => {
            e.preventDefault()

            const saveForm: SubmitHandler<OutputFormValues> = async (
              data,
              // eslint-disable-next-line @typescript-eslint/require-await
            ): Promise<void> => {
              alert(\`Saving payload... \\n \${JSON.stringify(data, null, 2)}\`)
            }

            const submitHandler = void formMethods.handleSubmit(saveForm)()

            return submitHandler
          }, [])

          const isError = Object.entries(formMethods.formState.errors).length !== 0

          return (
            <Box
              id='playground-form'
              component='form'
              onSubmit={onSubmit}
              sx={{
                unset: 'all',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingBottom: '10px',
              }}
            >
              <RowForInputFields width='100%'>
                <DateControlled
                  name='date'
                  formMethods={formMethods}
                  legendText={t('label.legendText')}
                  placeholder='Placeholder'
                />
                <InputControlled
                  name='input'
                  formMethods={formMethods}
                  legendText={t('label.legendText')}
                  placeholder='Placeholder'
                />
              </RowForInputFields>

              <RowForInputFields width='100%'>
                <AutocompleteWithFreeTextControlled
                  formMethods={formMethods}
                  name='autocompleteWithFreeText'
                  legendText={t('label.legendText')}
                  placeholder='Placeholder'
                  optionList={['foo', 'bar']}
                />
                <AutocompleteControlled
                  formMethods={formMethods}
                  name='autocomplete'
                  legendText={t('label.legendText')}
                  placeholder='Placeholder'
                  optionList={['foo', 'bar']}
                />
              </RowForInputFields>

              <RowForInputFields
                height='auto'
                width='100%'
              >
                <InputControlled
                  formMethods={formMethods}
                  name='textarea'
                  legendText={t('label.legendText')}
                  placeholder='Placeholder'
                  multiline
                  rows={3}
                />
              </RowForInputFields>

              <RowForInputFields width='auto'>
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText={t('label.legendText')}
                  label={t('label.checkbox')}
                />
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText={t('label.legendText')}
                  label={t('label.checkbox')}
                />
              </RowForInputFields>

              <RowForInputFields width='50%'>
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText='legendText'
                  label={t('label.checkbox')}
                />
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText={t('label.legendText')}
                  label={t('label.checkbox')}
                />
              </RowForInputFields>

              <RowForInputFields width='500px'>
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText={t('label.legendText')}
                  label={t('label.checkbox')}
                />
                <CheckboxControlled
                  formMethods={formMethods}
                  name='checkbox'
                  legendText={t('label.legendText')}
                  label={t('label.checkbox')}
                />
              </RowForInputFields>

              <RowForInputFields width='auto'>
                <SelectControlled
                  formMethods={formMethods}
                  name='select'
                  legendText={t('label.legendText')}
                  optionList={['option 1', 'option 2', 'option 3']}
                />
              </RowForInputFields>

              <RowForInputFields>
                <ToggleControlled
                  formMethods={formMethods}
                  name='toggle'
                  legendText={t('label.legendText')}
                  label={t('label.toggle')}
                />
              </RowForInputFields>

              {isError && (
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                    borderRadius: 1,
                    marginBottom: '20px',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      right: '10px',
                      color: '#2c2c2c',
                      fontSize: '14px',
                    }}
                  >
                    Form errors
                  </Box>
                  <Box component='pre'>
                    {JSON.stringify(formMethods.formState.errors, null, 2)}
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  position: 'relative',
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '10px',
                    color: '#2c2c2c',
                    fontSize: '14px',
                  }}
                >
                  Form values
                </Box>
                <Box component='pre'>
                  {JSON.stringify(formMethods.watch(), null, 2)}
                </Box>
              </Box>
            </Box>
          )
        }

      `}</Code>

      <Code block jsx>{`
        // SubmitFormButton.tsx

        import { Button } from '@src/shared/components/Button'
        import { theme } from '@src/shared/theme'

        export const SubmitFormButton = (): React.JSX.Element => {
          return (
            <Button
              form='playground-form'
              type='submit'
              sx={{
                backgroundColor: theme.colors.purple,
              }}
            >
              Submit
            </Button>
          )
        }

      `}</Code>

      <Code block jsx>{`
        // CloseFormIcon.tsx

        import { Close } from '@mui/icons-material'
        import { IconButton } from '@mui/material'
        import { useEffect, useState } from 'react'
        import { useTranslation } from 'react-i18next'
        import { ConfirmationDialog } from '@src/shared/components/ConfirmationDialog'
        import { useFormPlayground } from '../form-config/useFormPlayground'

        export const CloseFormIcon = (): React.JSX.Element => {
          const { t } = useTranslation()
          const [isDialogOpen, setIsDialogOpen] = useState(false)
          const { formMethods } = useFormPlayground()

          const showCloseConfirmationDialog = (): void => {
            setIsDialogOpen(true)
          }

          const closeModal = (): void => {
            alert('Close & navigate up')
          }

          useEffect(() => {
            const closeModalOnEscape = (e: KeyboardEvent): void => {
              if (e.key === 'Escape') {
                if (formMethods.formState.isDirty) {
                  showCloseConfirmationDialog()
                } else {
                  closeModal()
                }
              }
            }

            document.addEventListener('keydown', closeModalOnEscape)

            return (): void => {
              document.removeEventListener('keydown', closeModalOnEscape)
            }
          }, [formMethods.formState.isDirty])

          return (
            <>
              <IconButton
                onClick={() => {
                  if (formMethods.formState.isDirty) {
                    setIsDialogOpen(true)
                  } else {
                    closeModal()
                  }
                }}
              >
                <Close />
              </IconButton>
              <ConfirmationDialog
                title={t('dialog.confirm')}
                text={t('dialog.closeUnsaved')}
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onSuccess={closeModal}
              />
            </>
          )
        }

      `}</Code>

      <Code block jsx>{`
        // FormPlaygroundModal.tsx

        import { ModalLayout } from '@src/shared/layout/ModalLayout'
        import { CloseFormIcon } from './widgets/CloseFormIcon'
        import { DeleteButton } from './widgets/DeleteButton'
        import { FormContent } from './widgets/FormContent'
        import { SubmitFormButton } from './widgets/SubmitFormButton'
        import { FormPlaygroundProvider } from './form-config/FormPlaygroundProvider'

        export const FormPlaygroundModal = (): React.JSX.Element => {
          return (
            <FormPlaygroundProvider>
              <ModalLayout
                headerText={'Form playground'}
                closeButton={<CloseFormIcon />}
                content={<FormContent />}
                leftFooterButton={<DeleteButton />}
                rightFooterButton={<SubmitFormButton />}
                isProgressBar={false}
                hideContentForDevPurpose={false}
                outlinedContentForDevPurpose={false}
              />
            </FormPlaygroundProvider>
          )
        }

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
