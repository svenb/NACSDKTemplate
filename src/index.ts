import { ClientCredentials, FormControl, Sdk, WorkflowHelper } from "@nwc-sdk/client"



class Test {

    static connect = async (): Promise<Sdk> => {

        const creds: ClientCredentials = {
            clientId: "3a9f225f-b8d6-455c-bc41-6387fcd38dac",
            clientSecret: "tWUsLLKKItRWsKtUsIRPtUsQKP2DsKMtUVsMQOtSsINtSsPtP2EtUS2LtWRsFQtSSsQF2asLNF2IsItW2PsQRR2asJKRJtVsN"
        }

        const client = await Sdk.connectWithClientCredentials(creds)
        return client

    }



    static allFormControls = (rows: { controls: FormControl[] }[], allControls: FormControl[] = []): FormControl[] => {

        for (const row of rows) {

            for (const control of row.controls) {
                allControls.push(control)
                if ((control.properties.rows)) {
                    this.allFormControls(control.properties.rows, allControls)
                }
            }
        }
        return allControls
    }

}

Test.connect().then((cl) => {

    console.log(cl.tenant.name)      

    cl.getWorkflowByName('TEST1654654654').then((wfl) => {
    
        const allControls = Test.allFormControls(wfl?.forms.startForm!.rows!)
        const result = allControls.map((control) => {
            const props = control.properties as any;
            return {
                name: props["name"],
                variableName: props["connectedVariableId"]
            }
        });;
        
        console.log(result)

    })
})