import { useState, useRef, useEffect } from 'react'
// import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { User } from '../../types'
import UserModal from '../UserModal'
import ConfirmDelete from '../ConfirmDelete'

const initUser: User = {
  id: 0,
  name: '',
  email: '',
  phoneNumber: '',
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([])
  const [openUser, setOpenUser] = useState(false)
  const [openDelUserDialog, setOpenDelUserDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(initUser)

  const lastId = useRef(0)

  useEffect(() => {
    if (!!selectedUser.name && !openUser) {
      let id = selectedUser.id

      if (selectedUser.id === 0) {
        id = ++lastId.current

        setUsers((users: User[]) => [
          ...users,
          {
            ...selectedUser,
            id: id,
          },
        ])
      } else {
        setUsers((users: User[]) => {
          const updUsers: User[] = users.map((user: User) => {
            if (user.id === selectedUser.id) {
              return selectedUser
            }
            return user
          })

          return updUsers
        })
      }
    }
  }, [selectedUser, openUser])

  const handleUserClose = () => {
    setOpenUser(false)
  }

  const handleAddUserClick = () => {
    setSelectedUser(initUser)
    setOpenUser(true)
  }

  const handleEditUserClick = (user: User) => {
    setSelectedUser(user)
    setOpenUser(true)
  }

  const handleDeleteUserClick = (user: User) => {
    setSelectedUser(user)
    setOpenDelUserDialog(true)
  }

  const handleDelUserDialogClose = (id?: number) => {
    setOpenDelUserDialog(false)

    if (id !== 0) {
      setUsers(users => users.filter(e => e.id !== id))
    }
  }

  return (
    <Box sx={{ flexGrow: 1, width: '70%', margin: 'auto' }}>
      <TableContainer
        sx={{
          marginTop: 3,
          alignContent: `center`,
          '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
          },
        }}
        component={Paper}
      >
        <Table aria-label="Table of Users" size="small">
          <TableHead>
            <TableRow sx={{ height: '55px' }}>
              <TableCell
                sx={{
                  width: '40px',
                }}
              ></TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone number</TableCell>
              <TableCell
                sx={{
                  width: '40px',
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan={6} align="center">
                <IconButton aria-label="add" onClick={handleAddUserClick}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow
                key={user.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditUserClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteUserClick(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal
        open={openUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onClose={handleUserClose}
      />
      <ConfirmDelete
        id={selectedUser.id}
        name={selectedUser.name}
        open={openDelUserDialog}
        onClose={handleDelUserDialogClose}
      />
    </Box>
  )
}

export default UsersTable
