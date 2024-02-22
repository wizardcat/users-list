import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  id: number
  name: string
  open: boolean
  onClose: (id?: number) => void
}

const ConfirmDelete = (props: Props) => {
  const { onClose, id, name: userName, open } = props

  const handleOk = () => {
    onClose(id)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete the user'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {userName} will be deleted. Are you shure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleOk}>
            Ok
          </Button>
          <Button variant="outlined" autoFocus onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDelete
