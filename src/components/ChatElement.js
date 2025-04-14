import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme ,styled } from "@mui/material/styles";
import { SelectConversation } from "../redux/slices/app";
import { useDispatch } from "react-redux";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  




const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    const dispatch=useDispatch();
    return (
      <Box
      onClick={()=>{
        dispatch(SelectConversation({room_id:id}))
      }}
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: theme.palette.mode==="light" ? "#fff" : theme.palette.background.default,
          padding: 1.5,
          boxSizing: 'border-box', // Ensure padding and borders are included in total width/height
          overflow: 'hidden', // Handle overflow
        }}
      >
        <Stack
          direction="row"
          alignItems='center' 
          justifyContent='space-between'
          spacing={2}
        >
          <Stack direction="row" spacing={2}>
            {online ? (
              <StyledBadge 
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar src={img || faker.image.avatar()} />
              </StyledBadge>
            ) : (
              <Avatar src={img || faker.image.avatar()} />
            )}
  
            <Stack spacing={0.5}>
              <Typography
                variant='subtitle2'
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
              >
                {name}
              </Typography>
              <Typography 
                variant='caption'
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
              >
                {msg}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1} alignItems="center">
            <Typography 
              sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
              variant='caption'
            >
              {time}
            </Typography>
            {unread > 0 && (
              <Badge color='primary' badgeContent={unread} />
            )}
          </Stack>
        </Stack>
      </Box> 
    );
  }


  export default ChatElement;
  