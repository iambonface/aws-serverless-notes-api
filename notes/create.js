import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function create(event, context, callback) {
	const data = JSON.parse(event.body);

	const params = {
		TableName: "notes",
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			createdAt: new Date().getTime()
		}
	};
	try {
		await dynamoDbLib.call("put", params);
		callback(null, success(params.Item));
	} catch (e) {
		callback(null, failure({ status: false }));
	}

	/*dynamoDb.put(params, (error, data) => {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		};

		if(error) {
			const response = {
				statusCode: 500,
				headers: headers,
				body: JSON.stringify({ status: false })
			};
			callback(null, response);
			return;
		}

		const response = {
			statusCode: 200,
			headers: headers,
			body: JSON.stringify(params.Item)
		};
		callback(null, response);
	});*/
}