import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { User } from '../../types'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 3,
}

type Props = {
  open: boolean
  selectedUser: User
  setSelectedUser: Dispatch<SetStateAction<User>>
  onClose: () => void
}

const UserModal = (props: Props) => {
  const {
    open,
    selectedUser: user,
    setSelectedUser,
    onClose: handleClose,
  } = props
  const [values, setValues] = useState(user)

  useEffect(() => {
    setValues({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    })
  }, [user.id, user.name, user.email, user.phoneNumber, open])

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid.'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Must be at least 10 digits'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const handleChange = (value: User) => {
    setValues(value)
  }

  const handleSave = () => {
    setSelectedUser(values)

    handleClose()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              New User
            </Typography>
            <br />
            <Stack component="form" spacing={2}>
              <TextField
                required
                fullWidth
                label="User Name"
                variant="outlined"
                size="small"
                autoFocus //it doesn't work with StrictMode + ReactDOM.createRoot!
                {...register('userName')}
                error={errors.name ? true : false}
                helperText={errors.name?.message as any}
                name="userName"
                value={values.name}
                onChange={event =>
                  handleChange({ ...values, name: event.target.value })
                }
              />
              <TextField
                required
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message as any}
                name="email"
                value={values.email}
                onChange={event =>
                  handleChange({ ...values, email: event.target.value })
                }
              />
              <TextField
                required
                fullWidth
                label="Phone Number"
                variant="outlined"
                size="small"
                {...register('phoneNumber')}
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message as any}
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={event =>
                  handleChange({ ...values, phoneNumber: event.target.value })
                }
              />
            </Stack>
            <br />
            <Stack
              spacing={2}
              direction="row"
              sx={{
                justifyContent: 'end',
              }}
            >
              <Button variant="outlined" onClick={handleSubmit(handleSave)}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default UserModal
