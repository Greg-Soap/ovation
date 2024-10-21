'use client'
import { decodeIdToken } from '@/lib/helper-func'
import { GoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'

const GoogleAuth = ({ func, form }: any) => {
  const [googleLoginInfo, setGoogleLoginInfo] = useState(null as any)

  const handleSuccess = async (response: any) => {
    // Extract access token from response
    const { credential } = response
    if (!credential) {
      //handle no credentials
      return
    }

    try {
      const userInfo = decodeIdToken(credential)
      window.localStorage.setItem(
        'google_info',
        JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          profile: userInfo.picture,
        }) as string,
      )
      form.setValue('type', 'Google')
      func({ googleObject: userInfo })
      // Handle user info and perform authentication to check if user already exist in the api
    } catch (error) {
      console.error('Error decoding ID token:', error)
    }
  }

  useEffect(() => {
    const getInfo = () => {
      const googleInfo = window.localStorage.getItem('google_info')
      if (googleInfo) {
        setGoogleLoginInfo(JSON.parse(googleInfo))
      }
    }
    getInfo()
  }, [])

  const handleError = (error: any) => {
    console.error('Login Failed:', error)
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <div
          className="px-4 h-[51px] text-[14px] md:text-base w-full bg-white  flex gap-4  justify-center items-center cursor-pointer"
          style={{
            borderRadius: '500px',
            justifyContent: !googleLoginInfo ? 'center' : 'flex-start',
            display: 'flex',
          }}
        >
          <div style={{ position: 'absolute', opacity: '0' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError as any}
              size="large"
            />
          </div>
          {googleLoginInfo ? (
            <div className="flex">
              <img
                src={googleLoginInfo?.profile}
                alt="profile"
                className="w-[30px] h-[30px] mr-[10px]"
                style={{ borderRadius: '50%' }}
              />
              <div>
                <p className="text-xs text-black">
                  sign in as {googleLoginInfo?.name?.slice(0, 20)}.
                </p>
                <p className="text-xs text-black">{googleLoginInfo?.email}</p>
              </div>
            </div>
          ) : (
            <>
              <img
                src={'assets/images/google.png'}
                alt=""
                className="w-[21px] h-[20px]"
              />
              <p className="text-sm text-black font-semibold">
                Login with Google
              </p>
            </>
          )}
        </div>
      </div>
      <div id="login__connect-wallet" className="flex flex-col gap-4 mb-[45px]">
        <span className="flex gap-2 items-center justify-center">
          <span className="w-[45%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6] text-center">
            OR
          </p>
          <span className="w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </span>
      </div>
    </>
  )
}

export default GoogleAuth
