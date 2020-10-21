import React from 'react';
import { Table } from 'reactstrap';

const PostsList = props => {
    const { postList } = props;
    return (
        <div>
            <Table>
              <thead className="table-heading">
                <tr>
                  <th className="table-title">#</th>
                  <th className="table-title">User Id</th> 
                  <th className="table-title">Title</th>
                  <th className="table-title">Description</th>
                </tr>
              </thead>
              
              <tbody>
                {postList.length > 0 ?
                    postList.map(post => (
                        <tr key={post.id}>
                          <td>{post.id}</td>
                          <td>{post.userId}</td>
                          <td>{post.title}</td>
                          <td>{post.body}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td className="text-center" colSpan="4">No Records Found</td>
                    </tr>
                }
                
              </tbody>
            </Table>
        </div>
    );
};

export default PostsList;