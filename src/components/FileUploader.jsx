import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import { uploadFile } from 'apiClient/upload'
import CircularProgressWithLabel from 'components/CircularProgressWithLabel'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.palette.grey['400'],
    padding: theme.spacing(2, 1),
    '& .MuiTypography-root': {
      cursor: 'copy'
    }
  },
  error: {
    borderColor: theme.palette.error.main
  },
  content: {
    minHeight: 190,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}))

const FileUploader = ({ error, filePrefix, onChange, accept }) => {
  const classes = useStyles()
  const [progress, setProgress] = useState(0)

  const handleOnDrop = useCallback(
    async ([file]) => {
      try {
        setProgress(0)
        const fileUrl = await uploadFile({
          filePrefix,
          file,
          onProgress: setProgress
        })
        onChange(fileUrl)
      } catch (error) { }
    },

    [filePrefix, onChange]
  )

  return (
    <Dropzone
      maxFilesize={10}
      multiple={false}
      accept={accept}
      onDrop={handleOnDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <Box className={clsx(classes.root, { [classes.error]: error })}>
          <div {...getRootProps()} className={classes.content}>
            <input {...getInputProps()} />
            <Typography variant='body2'>
              Arrastra aquí tu archivo o has click para seleccionar uno
            </Typography>
            {progress > 0 && (
              <CircularProgressWithLabel value={progress} />
            )}
          </div>
        </Box>
      )}
    </Dropzone>
  )
}

FileUploader.propTypes = {
  filePrefix: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  accept: PropTypes.array
}

FileUploader.defaultProps = {
  error: false,
  accept: []
}

export default FileUploader
