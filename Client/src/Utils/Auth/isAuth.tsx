"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import {userRoles} from '../../../../server/src/utils/userRoles';
import { ROLE } from '@/Utils/Cookies';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {

    const auth = ROLE === userRoles.ADMIN || ROLE === userRoles.MANAGER;

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}