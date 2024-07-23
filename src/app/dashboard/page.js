import { Suspense } from "react"
import Separator from '@/components/seperator';
import Skeleton from '@/components/skeleton';
import Link from 'next/link'
import {PlusCircle} from 'lucide-react'
import { sizes, variants } from "@/lib/variants"
import Loading from "./loading";
import Trend from "./components/trend"
import TrendFallback from "./components/trend-fallback";
import { ErrorBoundary } from "react-error-boundary";
import { createClient } from "@/lib/supabase/server"
import { types } from "@/lib/consts";
import Range from "./components/range"
import TransactionListWrapper from "./components/transaction-list-wrapper"

export default async function Page({ searchParams }) {
  const supabase = createClient()
    const { data: { user: { user_metadata: settings } } } = await supabase.auth.getUser()
  const range = searchParams?.range ?? settings?.defaultView ?? 'last30days'

    return (<div className="space-y-8">
    <section className="flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Summary</h1>
      <aside>
        <Range  defaultView={settings?.defaultView} />
      </aside>
    </section>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator />
        <div className="flex space-x-8">
        {types.map(type => <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={type}  range={range}/>
        </Suspense>
      </ErrorBoundary>)}
        </div>
      </div>     
      <div>      
        <Separator />
        <div className="space-y-4"> 
        <section className="flex justify-between items-center mb-8">
      <h2 className="text-2xl">Transactions</h2>
      <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}>
        <PlusCircle className="w-4 h-4" />
        <div>Add</div>
      </Link>
    </section>

        <Suspense fallback={<Loading />}>
           <TransactionListWrapper range={range} />
         </Suspense>      
        </div>
      </div>
     
    </div>)
  }
