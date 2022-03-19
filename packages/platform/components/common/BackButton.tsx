import Button from '@mui/material/Button'
import { ReactNode } from 'react'
import { To, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Theme } from '@mui/material/styles';

type Props = {
  content: string | ReactNode
  to: To
}

const BackButton = ({
  content,
  to
}: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={
        <ArrowBackIcon />
      }
      variant="contained"
      color="inherit"
      sx={{
        fontSize: 18,
        py: 1,
        backgroundColor: "background.default",
        color: (theme: Theme) => theme.palette.text.primary,
        "&:active": {
          backgroundColor: "background.lighten",
        },
        "&:hover": {
          boxShadow: (theme: Theme) => theme.outline.focus
        },
        "&:focus": {
          boxShadow: (theme: Theme) => theme.outline.focus
        },
        "&>.content": {
          pt: 0.25
        }
      }}
      disableElevation
      onClick={() => to && navigate(to)}
    >
      <div className="content">
        {content}
      </div>
    </Button>
  )
}

export default BackButton