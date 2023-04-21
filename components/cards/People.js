import { UserContext } from "../../context";
import { useContext } from "react";
import { List } from "antd";
import { imageAvatar } from "../../functions";
import Link from "next/link";

function People({people, handleFollow, handleUnfollow}) {

    const [state] = useContext(UserContext);

  

    return ( 
        <>
            <List
                className=""
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar= {imageAvatar(user, 40)}
                            title={
                                <div className="d-flex justify-content-between">
                                    <Link href={`/user/${user.username}`}>
                                    {user.username}
                                    </Link>
                                    {state &&
                                    state.user &&
                                    user.followers &&
                                    user.followers.includes(state.user._id) ? (
                                        <span
                                        onClick={() => handleUnfollow(user)}
                                        className="text-primary cursor-pointer"
                                        >
                                        Unfollow
                                        </span>
                                    ):(
                                        <span
                                        onClick={() => handleFollow(user)}
                                        className="text-primary cursor-pointer"
                                        >
                                        Follow
                                        </span>
                                    )
                                    }
                                    
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <hr />
        </>
     );
}

export default People;