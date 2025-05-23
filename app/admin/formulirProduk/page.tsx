'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProductContext } from '../context/ProductContext'

export default function FormulirProdukPage() {
  const { products, addProduct } = useProductContext()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nama: '',
    stok: '',
    status: 'Tersedia'
  })

  useEffect(() => {
    const delayLoad = async () => {
      await new Promise((res) => setTimeout(res, 1000)) // ⏱ Delay 1 detik
      setLoading(false)
    }
    delayLoad()
  }, [])

  const getNextId = () => {
    if (products.length === 0) return '001'
    const maxId = Math.max(...products.map(p => parseInt(p.id)))
    return (maxId + 1).toString().padStart(3, '0')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      id: getNextId(),
      ...formData,
      stok: parseInt(formData.stok)
    }

    addProduct(newProduct)
    alert(`Produk ${formData.nama} berhasil disimpan!`)
    router.push('/admin/daftarProduk')
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <div className="w-24 h-10 bg-gray-200 rounded"></div>
          <div className="w-32 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Formulir Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Contoh: Ferrari"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stok Produk
              </label>
              <input
                type="number"
                value={formData.stok}
                onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Contoh: 50"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Produk
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/daftarProduk')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  )
}
