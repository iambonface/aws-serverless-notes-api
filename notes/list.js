import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function notes(event, context, callback) {
	const params = {
		TableName: "notes",
		KeyConditionExpression: "userId = :userId", //condition for query
		ExpressionAttributeValues: {
			":userId" : event.requestContext.identity.cognitoIdentityId
		}
	};

	try {
		const result = await dynamoDbLib.call("query", params);
		callback(null, success(result.Items));

	} catch (e) {
		callback(null, failure({ status: false }));
	}
}