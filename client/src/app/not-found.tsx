import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-white gap-3'>
      <h2 className='font-bold text-2xl bg-red-400 rounded-md w-auto h-auto px-5 py-3'>Pagina no Enconrada 🤯😵</h2>
      <Link href="/" className='w-[150px] h-[60px] flex flex-nowrap justify-center items-center  font-semibold text-xl  bg-red-300 rounded-md border-none hover:bg-slate-800 hover:text-red-200 transition-colors ease-linear duration-150'>🏠 Volver</Link>
    </div>
  )
}