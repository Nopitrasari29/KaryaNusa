const data=[
  {skill:"Programming",users:120},
  {skill:"Desain Grafis",users:90},
  {skill:"Fotografi",users:70},
  {skill:"Menulis",users:65}
]

export default function AnalyticsDashboard(){

  return(

    <section className="py-16 bg-gray-100">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Analytics Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {data.map((item,i)=>(
            <div key={i} className="bg-white p-6 rounded-lg shadow">

              <h3 className="text-xl font-semibold">

                {item.skill}

              </h3>

              <p className="text-4xl font-bold text-green-600 mt-3">

                {item.users}

              </p>

              <p className="text-gray-500">

                pengguna memilih skill ini

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>

  )
}