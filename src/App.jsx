import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function App() {

  const [aba, setAba] = useState('escolas')

  // ESCOLAS
  const [nomeEscola, setNomeEscola] = useState('')
  const [diretor, setDiretor] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [listaEscolas, setListaEscolas] = useState([])

  // TURMAS
  const [nomeTurma, setNomeTurma] = useState('')
  const [serie, setSerie] = useState('')
  const [escolaTurma, setEscolaTurma] = useState('')

  // ALUNOS
  const [nomeAluno, setNomeAluno] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [sexo, setSexo] = useState('')
  const [escolaAluno, setEscolaAluno] = useState('')
  const [turmaAluno, setTurmaAluno] = useState('')

  // AVALIAÇÕES
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultadoIMC, setResultadoIMC] = useState('')

  // CARREGAR ESCOLAS

  async function carregarEscolas() {

    const { data } = await supabase
      .from('escolas')
      .select('*')
      .order('id', { ascending: false })

    setListaEscolas(data || [])
  }

  useEffect(() => {
    carregarEscolas()
  }, [])

  // CALCULAR IMC

  function calcularIMC() {

    if (!peso || !altura) return

    const imc = (
      Number(peso) /
      (Number(altura) * Number(altura))
    ).toFixed(1)

    setResultadoIMC(imc)
  }

  // SALVAR ESCOLA

  async function salvarEscola() {

    const { error } = await supabase
      .from('escolas')
      .insert([
        {
          nome: nomeEscola,
          diretor: diretor,
          telefone: telefone,
          endereco: endereco
        }
      ])

    if (error) {
      alert('Erro ao salvar escola')
      return
    }

    carregarEscolas()

    alert('Escola salva com sucesso')

    setNomeEscola('')
    setDiretor('')
    setTelefone('')
    setEndereco('')
  }

  // SALVAR TURMA

  async function salvarTurma() {

    const { error } = await supabase
      .from('turmas')
      .insert([
        {
          nome: nomeTurma,
          serie: serie,
          escola: escolaTurma
        }
      ])

    if (error) {
      alert('Erro ao salvar turma')
      return
    }

    alert('Turma salva com sucesso')

    setNomeTurma('')
    setSerie('')
    setEscolaTurma('')
  }

  // SALVAR ALUNO

  async function salvarAluno() {

    const { error } = await supabase
      .from('alunos')
      .insert([
        {
          nome: nomeAluno,
          nascimento: nascimento,
          sexo: sexo,
          escola: escolaAluno,
          turma: turmaAluno
        }
      ])

    if (error) {
      alert('Erro ao salvar aluno')
      return
    }

    alert('Aluno salvo com sucesso')

    setNomeAluno('')
    setNascimento('')
    setSexo('')
    setEscolaAluno('')
    setTurmaAluno('')
  }

  // SALVAR AVALIAÇÃO

  async function salvarAvaliacao() {

    const { error } = await supabase
      .from('avaliacoes')
      .insert([
        {
          aluno: nomeAluno,
          peso: peso,
          altura: altura,
          imc: resultadoIMC
        }
      ])

    if (error) {
      alert('Erro ao salvar avaliação')
      return
    }

    alert('Avaliação salva com sucesso')

    setPeso('')
    setAltura('')
    setResultadoIMC('')
  }

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">

          <h1 className="text-4xl font-bold text-slate-800">
            Sistema de Nutrição Escolar
          </h1>

          <p className="text-slate-500 mt-2">
            Controle antropométrico escolar
          </p>

        </div>

        {/* MENU */}

        <div className="flex gap-3 flex-wrap mb-6">

          <button
            onClick={() => setAba('escolas')}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
          >
            🏫 Escolas
          </button>

          <button
            onClick={() => setAba('turmas')}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
          >
            📚 Turmas
          </button>

          <button
            onClick={() => setAba('alunos')}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
          >
            👧 Alunos
          </button>

          <button
            onClick={() => setAba('avaliacoes')}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
          >
            📊 Avaliações
          </button>

        </div>

        {/* ESCOLAS */}

        {aba === 'escolas' && (

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6">
              Cadastro de Escolas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

              <input
                type="text"
                placeholder="Nome da escola"
                value={nomeEscola}
                onChange={(e) => setNomeEscola(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Diretor(a)"
                value={diretor}
                onChange={(e) => setDiretor(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

            </div>

            <button
              onClick={salvarEscola}
              className="bg-green-600 text-white px-5 py-3 rounded-2xl"
            >
              Salvar Escola
            </button>

            {/* LISTA ESCOLAS */}

            <div className="mt-8">

              <h3 className="text-2xl font-bold mb-4">
                Escolas Cadastradas
              </h3>

              <div className="space-y-3">

                {listaEscolas.map((escola) => (

                  <div
                    key={escola.id}
                    className="bg-slate-100 rounded-2xl p-4"
                  >

                    <p className="font-bold text-lg">
                      {escola.nome}
                    </p>

                    <p>
                      Diretor(a): {escola.diretor}
                    </p>

                    <p>
                      Telefone: {escola.telefone}
                    </p>

                    <p>
                      Endereço: {escola.endereco}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* TURMAS */}

        {aba === 'turmas' && (

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6">
              Cadastro de Turmas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

              <input
                type="text"
                placeholder="Nome da turma"
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Ano/Série"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Escola"
                value={escolaTurma}
                onChange={(e) => setEscolaTurma(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

            </div>

            <button
              onClick={salvarTurma}
              className="bg-green-600 text-white px-5 py-3 rounded-2xl"
            >
              Salvar Turma
            </button>

          </div>
        )}

        {/* ALUNOS */}

        {aba === 'alunos' && (

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6">
              Cadastro de Alunos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">

              <input
                type="text"
                placeholder="Nome do aluno"
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="date"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              >

                <option value="">
                  Sexo
                </option>

                <option>
                  Feminino
                </option>

                <option>
                  Masculino
                </option>

              </select>

              <input
                type="text"
                placeholder="Escola"
                value={escolaAluno}
                onChange={(e) => setEscolaAluno(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Turma"
                value={turmaAluno}
                onChange={(e) => setTurmaAluno(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

            </div>

            <button
              onClick={salvarAluno}
              className="bg-green-600 text-white px-5 py-3 rounded-2xl"
            >
              Salvar Aluno
            </button>

          </div>
        )}

        {/* AVALIAÇÕES */}

        {aba === 'avaliacoes' && (

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6">
              Avaliação Nutricional
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">

              <input
                type="text"
                placeholder="Nome do aluno"
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Peso (kg)"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Altura (m)"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="border rounded-2xl px-4 py-3"
              />

              <button
                onClick={calcularIMC}
                className="bg-blue-600 text-white rounded-2xl px-4 py-3"
              >
                Calcular IMC
              </button>

              <div className="bg-slate-100 rounded-2xl px-4 py-3 flex items-center justify-center text-xl font-bold">

                IMC: {resultadoIMC || '--'}

              </div>

            </div>

            <button
              onClick={salvarAvaliacao}
              className="bg-green-600 text-white px-5 py-3 rounded-2xl"
            >
              Salvar Avaliação
            </button>

          </div>
        )}

      </div>

    </div>
  )
}