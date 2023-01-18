import {getProviders , signIn} from 'next-auth/react'

function login({providers}:{providers:any}) {
  return ( 
  <>
    <div>login</div>

    {Object.values(providers).map((provider :any) => (
      <div key={provider.name}>
        <button className='bg-[#18D860] text-white p-5 rounded-full'
        onClick={() => signIn(provider.id , {callbackUrl: '/'})}
        >Login with {provider.name}</button>
      </div>
    ))}

  </>
  )
}

export default login

export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props:{
            providers
        }
    }
}