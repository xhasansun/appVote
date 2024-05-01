'use client'
import React, { useState, useEffect } from 'react'
import { PersonCardStyled } from '@/components/VoteList/styled/personCard.styled'
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import Link from 'next/link';
import logger from '@/helpers/logger';

const PersonCard = ({ data }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getDataFromLocalStorage = JSON.parse(localStorage.getItem('users'))
        if (getDataFromLocalStorage) {
            setUsers(getDataFromLocalStorage)
        } else {
            console.log("param")
            const sortedData = data.slice().sort((a, b) => b.rating - a.rating);
            setUsers(sortedData)
        }
    }, [data])


    const itemTemplate = (user, index) => {
        return (
            <div className="col-12" key={user.id}>
                <div className={classNames('flex flex-column sm:flex-row sm:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <Link href={{ pathname: `/userDetail/${user.id}`, params: { userData: JSON.stringify(user) } }}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://i.pravatar.cc/150?img=${user.image}`} alt={user.name} />
                    </Link>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Link href={{ pathname: `/userDetail/${user.id}`, params: { userData: JSON.stringify(user) } }}>
                                <div className="text-2xl font-bold text-900">{user.name}</div>
                            </Link>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-briefcase"></i>
                                    <span className="font-semibold">{user.position}</span>
                                </span>
                                <Tag value={user.rating}></Tag>
                            </div>
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-star"></i>
                                {user.skills.map((skill, index) => (
                                    <React.Fragment key={index}>
                                        <span className="font-semibold">{skill}</span>
                                        {index < user.skills.length - 1 && <span className="mx-1">-</span>}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button
                                icon="pi pi-thumbs-up"
                                className="p-button-rounded"
                                disabled={user.inventoryStatus === 'OUTOFSTOCK'}
                                onClick={() => handleRatingIncrease(user.id)}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((user, index) => {
            return itemTemplate(user, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };


    const handleRatingIncrease = (userId) => {
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                return { ...user, rating: user.rating + 1 };
            }
            return user;
        });

        const sortedUpdatedUsers = updatedUsers.slice().sort((a, b) => b.rating - a.rating);
        setUsers(sortedUpdatedUsers);
        localStorage.setItem('users', JSON.stringify(sortedUpdatedUsers));
        //Logger
        const user = updatedUsers.find(user => user.id === userId);
        const userName = user ? user.name : 'Unknown';
        logger.info(`${userName} rating increased. Total rating: ${user.rating}`);

    };

    return (
        <div>
            <PersonCardStyled className="personCard">
                <div className="card">
                    <DataView value={users} listTemplate={listTemplate} />
                </div>
            </PersonCardStyled>
        </div>
    )
}

export default PersonCard