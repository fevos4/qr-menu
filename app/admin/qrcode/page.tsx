import { RESTAURANT_ID } from "@/lib/constants"

export default function QRPage() {
  const menuUrl = `http://localhost:3000/menu/${RESTAURANT_ID}`
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(menuUrl)}`

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">QR Code</h1>
      <p className="text-gray-500 mb-8">Scan this to view your menu</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 inline-block">
        <img src={qrImageUrl} alt="QR Code" width={256} height={256} />
        <p className="text-center text-gray-500 mt-4 text-sm break-all">{menuUrl}</p>
        <a
          href={qrImageUrl}
          download="qr-code.png"
          className="mt-4 block text-center bg-amber-700 text-white px-4 py-2 rounded-xl hover:bg-amber-800"
        >
          Download QR Code
        </a>
      </div>
    </div>
  )
}