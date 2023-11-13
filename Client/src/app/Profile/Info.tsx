// import React from 'react'

// const Info = () => {
//   return (
//     <div className='flex items-start gap-5 flex-col'>
//     <span className='flex flex-col items-start gap-2'>
//         <label>Name</label>
//         <span className='flex items-center'>
//         <input readOnly={updateMode === 'name' ? false : true} type='text' name='name' onChange={handleChange} value={info?.name} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         {updateMode === 'name' ?
//         <p onClick={(e) => updateUserInfo(e, CHANGE_NAME, {info.name})} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
//         :
//         <FontAwesomeIcon id='name' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
//         }
//         </span>
//     </span>
//     <span className='flex flex-col items-start gap-2'>
//         <label>Country</label>
//         <span className='flex items-center'>
//         <input readOnly={updateMode === 'country' ? false : true} type='text' name='country' onChange={handleChange} value={info?.country} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         {updateMode === 'country' ?
//         <p onClick={(e) => updateUserInfo(e, CHANGE_COUNTRY, {info.country})} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
//         :
//         <FontAwesomeIcon id='country' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
//         }
//         </span>
//     </span>
//     <span className='flex flex-col items-start gap-2'>
//         <label>Address</label>
//         <span className='flex items-center'>
//         <input readOnly={updateMode === 'address' ? false : true} type='text' name='address' onChange={handleChange} value={info?.address} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         {updateMode === 'address' ?
//         <p onClick={(e) => updateUserInfo(e, CHANGE_ADDRESS, {info.address})} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
//         :
//         <FontAwesomeIcon id='address' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
//         }
//         </span>
//     </span>
//     <span className='flex flex-col items-start gap-2'>
//         <label>Phone Number</label>
//         <span className='flex items-center'>
//         <input readOnly={updateMode === 'phoneNumber' ? false : true} type='text' name='phoneNumber' onChange={handleChange} value={info?.phoneNumber} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         {updateMode === 'phoneNumber' ?
//         <p onClick={(e) => updateUserInfo(e, CHANGE_PHONE_NUMBER, {info.phoneNumber})} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
//         :
//         <FontAwesomeIcon id='phoneNumber' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
//         }
//         </span>
//     </span>
//     {updateMode !== 'changePassword' && <p onClick={() => setUpdateMode('changePassword')} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Change Password</p>}
//     { updateMode === 'changePassword' &&
//     <span className='flex flex-col items-start gap-2'>
//         <span className='flex items-start flex-col gap-3'>
//         <label>Current Password</label>
//         <input type='password' name='currentPassword' onChange={handleChange} value={info?.currentPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         <label>New Password</label>
//         <input type='password' name='newPassword' onChange={handleChange} value={info?.newPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
//         <p onClick={(e) => updateUserInfo(e, CHANGE_PASSWORD, {info.currentPassword, info.newPassword})} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
//         </span>
//     </span>
//     }
//     {err && <p className='text-red-500 text-sm p-2 bg-black rounded-md'>{err}</p>}
//   )
// }

// export default Info