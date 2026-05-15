import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function App() {
  const [nome, setNome] = useState('')
  const [turma, setTurma] = useState('')
  const [escola, setEscola] = useState('')
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultadoIMC, setResultadoIMC] = useState('')

  const [alunos, setAlunos] = useState([])

  function calcularIMC() {
    if (!peso || !altura) return

    const imc = (
      Number(peso) /
      (Number(altura) * Number(altura))
    ).toFixed(1)

    setResultadoIMC(imc)
  }

  async function buscarAlunos() {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    setAlunos(data)
  }

  async function salvarAluno() {
    if (!nome || !peso || !altura) {
      alert('Preencha os campos')
      return
    }

    const imc = (
      Number(peso) /
      (Number(altura) * Number(altura))
    ).toFixed(1)

    const status =
      imc >= 18
        ? 'Sobrepeso'
        : 'Adequado'

    const { error } = await supabase
      .from('alunos')
      .insert([
        {
          nome,
          turma,
          escola,
          peso,
          altura,
          imc,
          status
        }
      ])

    if (error) {
      console.log(error)
      alert('Erro ao salvar aluno')
      return
    }

    alert('Aluno salvo com sucesso')

    buscarAlunos()

    setNome('')
    setTurma('')
    setEscola('')
    setPeso('')
    setAltura('')
    setResultadoIMC('')
  }

  useEffect(() => {
    buscarAlunos()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Sistema de Nutrição Escolar
          </h1>

          <p className="text-slate-500 mt-2">
            Controle antropométrico dos alunos
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Nova Avaliação Nutricional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Nome do aluno"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Escola"
              value={escola}
              onChange={(e) => setEscola(e.target.value)}
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Peso (kg)"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="number"
              step="0.01"
              placeholder="Altura (m)"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <button
              onClick={calcularIMC}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-4 py-3 font-semibold"
            >
              Calcular IMC
            </button>

            <button
              onClick={salvarAluno}
              className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-4 py-3 font-semibold"
            >
              Salvar Aluno
            </button>

            <div className="bg-slate-100 rounded-2xl px-4 py-3 flex items-center justify-center text-xl font-bold text-slate-700">
              IMC: {resultadoIMC || '--'}
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Alunos Cadastrados
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-4">Aluno</th>
                  <th className="pb-4">Turma</th>
                  <th className="pb-4">Escola</th>
                  <th className="pb-4">Peso</th>
                  <th className="pb-4">Altura</th>
                  <th className="pb-4">IMC</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {alunos.map((aluno) => (
                  <tr
                    key={aluno.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4">
                      {aluno.nome}
                    </td>

                    <td className="py-4">
                      {aluno.turma}
                    </td>

                    <td className="py-4">
                      {aluno.escola}
                    </td>

                    <td className="py-4">
                      {aluno.peso}
                    </td>

                    <td className="py-4">
                      {aluno.altura}
                    </td>

                    <td className="py-4 font-semibold">
                      {aluno.imc}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          aluno.status === 'Adequado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {aluno.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  )
}