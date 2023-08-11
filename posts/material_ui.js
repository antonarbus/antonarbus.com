import { React, jsxToStr, H, Code, Lnk } from '/components/post/reExport'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const postObj = {
  title: 'material ui',
  date: '2022.05.30',
  tags: ['react', 'mui'],
  imgUrl: 'https://antonarbus.com/imgs/mu.png',
  desc: 'material ui',
  body: (
    <>
      <H>Component prop</H>

      <ul>
        <li>We can use <Code html>{'<Box />'}</Code> element as a div element</li>
        <li>It does not have any styles</li>
        <li>We can apply styles via <code>sx</code> prop</li>
        <li>If we want to change the element tag we need to pass it in <code>component</code> prop</li>
        <li><Code html>{'<Box component="footer" />'}</Code> will be a footer element</li>
      </ul>

      <H>Custom css props</H>

      <ul>
        <li><Lnk path='https://mui.com/system/properties/'>https://mui.com/system/properties/</Lnk></li>
        <li>Can set some css properties as a component props or inside <code>sx</code> prop</li>
      </ul>

      <Code block jsx>{`
      <Button sx={{ mb: 3 }}>
      // or
      <Box mb={3}>
      // or
      <Box marginBottom={3}>
      `}</Code>

      <Code block css>{`
      .my-class {
        margin-bottom: Xpx;
      }
      `}</Code>

      <H>Unique keys in autocomplete issue</H>

      <ul>
        <li>If you have same values in autocomplete form react may throw an error</li>
        <li>Here is the example how to fix with <Code>renderOption</Code> prop</li>
      </ul>

      <Code block jsx>{`
      <Autocomplete
        freeSolo
        fullWidth
        open={open}
        options={gridProps.options}
        inputValue={inputValue}
        autoComplete
        autoHighlight
        selectOnFocus
        popupIcon={null}
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        onHighlightChange={(event, value) => {
          highlightedValue.current = value
        }}
        value={(gridProps.freeSolo && inputValue) || optionValue}
        onChange={(event, newValue, reason) => {
          if (newValue === null) {
            setOptionValue(emptyOption)
            return
          }
          setOptionValue(newValue)
          setOpen(false)
          setTimeout(() => {
            gridProps.api.stopEditing()
            gridProps.api.setFocusedCell(rowIndex, colKey)
          })
        }}
        filterOptions={(options) => {
          if (isInitRender && !isCharPressed) return options
          if (!inputValue.trim()) return options
          const foundOptions = options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
          if (isInitRender && isCharPressed) return foundOptions
          return foundOptions
        }}
        sx={{
          fontFamily: 'Circular, sans-serif',
          '& fieldset': {
            display: 'none'
          },
          '& .MuiAutocomplete-endAdornment': {
            background: 'transparent'
          },
          '& .MuiOutlinedInput-root': {
            background: 'transparent !important',
            pl: '15px'
          }
        }}
        renderInput={(params) => {
          return (
            <TextField
              inputRef={inputRef}
              onClick={() => {
                inputRef.current.select()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setTimeout(() => {
                    gridProps.api.stopEditing()
                    gridProps.api.setFocusedCell(rowIndex, colKey)
                  })
                  return
                }
                if (e.key === 'Tab') {
                  e.preventDefault()
                  if (highlightedValue.current) {
                    setOptionValue(highlightedValue.current)
                    setInputValue(highlightedValue.current?.label)
                  }
                  queueMicrotask(() => {
                    jumpToNextCell({ gridProps })
                  })
                }
              }}
              {...params}
              sx={{
                '& input': {
                  all: 'unset !important',
                  width: '100% !important'
                }
              }}
            />
          )
        }}
        componentsProps={{
          paper: {
            id: 'list-at-autocomplete-editor',
            elevation: 4,
            onClick: () => {
              gridProps.api.setFocusedCell(rowIndex, colKey)
            }
          },
          popper: {
            open: true,
            sx: {
              pt: 1,
              pb: 1,
              '& .MuiAutocomplete-noOptions': {
                display: 'none'
              }
            }
          }
        }}
      />
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
