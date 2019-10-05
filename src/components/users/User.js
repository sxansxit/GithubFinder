import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import Repos from "../repos/Repos";

const User = ({user, loading, getUser, getUserRepos, repos, match}) => {
    useEffect(()=> {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    },[]);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        company,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) return <Spinner/>;

    return (
        <Fragment>
            <Link to='/' className="btn btn-light border-secondary">
                Back to Search
            </Link> &nbsp;
            Hireable : {' '}
            {hireable ? <i className="fas fa-check text-success"/> :
                <i className="fas fa-times-circle text-danger"/>}

            <div className="card p-3 mt-4">
                <div className="d-flex flex-wrap">
                    <div className='p-2'>
                        <img src={avatar_url} className='rounded' alt={name}
                             style={{width: '150px'}}/>
                        <h2 className='mt-2'>{name}</h2>
                        <p>Location: {location}</p>
                    </div>
                    <div className='p-2'>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} rel="noreferrer noopener" target="_blank" className='btn btn-success my-1'>Visit
                            Github Profile</a>
                        <ul className='my-3'>
                            {login &&
                            <li>
                                <Fragment>
                                    <strong>Username : </strong> {login}
                                </Fragment>
                            </li>}
                            {company &&
                            <li>
                                <Fragment>
                                    <strong>Company : </strong> {company}
                                </Fragment>
                            </li>}
                            {blog &&
                            <li>
                                <Fragment>
                                    <strong>Website : </strong> <a rel="noreferrer noopener" target="_blank"
                                                                   href={blog}>{blog}</a>
                                </Fragment>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card mt-3 p-2">
                <div className='d-flex flex-wrap justify-content-center'>
                    <div
                        className='badge badge-success badge-pill font-weight-normal m-2 p-2'>Followers: {followers}</div>
                    <div
                        className='badge badge-info  badge-pill font-weight-normal m-2 p-2'>Following: {following}</div>
                    <div className='badge badge-warning  badge-pill font-weight-normal m-2 p-2'>Public
                        Repos: {public_repos}</div>
                    <div className='badge badge-danger  badge-pill font-weight-normal m-2 p-2'>Public
                        Gists: {public_gists}</div>
                </div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    );

};

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
};

export default User;
