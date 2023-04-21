import { Avatar} from "antd";

export const imageAvatar = (user, size ) => {
    
    if (user.image) {
        return <Avatar size={size} className="mb-2" src={user.image.url} />
    } else {
        return <Avatar size={size} className="mb-2"> {user.name[0].toUpperCase()}</Avatar>
    }
}

