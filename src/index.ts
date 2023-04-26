import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import {generateRandHexEncodedNamespaceID, generateRandMessage} from "./dummy";

const BASE_URL = `http://${process.env.BASE_URL}:26658`;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

type NamespaceID = string;

interface TxResponse {
	height: number;
	txhash: string;
	data: string;
	raw_log: string;
	logs: {
		msg_index: number;
		events: {
			type: string;
			attributes: {
				key: string;
				value: string;
			}[];
		}[];
	}[];
	gas_wanted: number;
	gas_used: number;
	events: {
		type: string;
		attributes: {
			key: string;
			value: string;
			index?: boolean;
		}[];
	}[];
}

async function makeRPCRequest(method: string, params: any[]) {
	try {
		const response = await axios.post(
			BASE_URL,
			{
				jsonrpc: "2.0",
				method: method,
				params: params,
				id: 1,
			},
			{
				headers: {
					Authorization: `Bearer ${AUTH_TOKEN}`,
				},
			}
		);
		return response.data.result;
	} catch (err: any) {
		console.log(err);
		throw new Error(err.response?.data?.error ?? "unknown error");
	}
}

export async function submitPFB(
	namespaceID: NamespaceID,
	data: string,
	fee: string,
	gasLimit: number
): Promise<TxResponse> {
	const result = await makeRPCRequest("state.SubmitPayForBlob", [
		namespaceID,
		data,
		fee,
		gasLimit,
	]);
	return result;
}



async function testSubmitPFB() {
	const result = await submitPFB(
		generateRandHexEncodedNamespaceID(),
		generateRandMessage(),
		"2000",
		80000
	);
	console.log(result);
}

testSubmitPFB();
