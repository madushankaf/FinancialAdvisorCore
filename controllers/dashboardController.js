const responseFormatter = require("../utils/responseFormatter");
const STATUS_CODES = require("../utils/statusCodes");
const leadData = require("../dummyData/lead");

exports.getLeadCountByType = async (request, reply) => {
  try {
    // Create an object to hold the counts
    const typeCounts = {};

    // Count leads by type
    leadData.forEach((lead) => {
      if (typeCounts[lead.type]) {
        typeCounts[lead.type]++;
      } else {
        typeCounts[lead.type] = 1;
      }
    });

    // Format the response
    const response = Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count,
    }));

    return reply
      .status(STATUS_CODES.OK)
      .send(
        responseFormatter(
          STATUS_CODES.OK,
          "Lead counts by type retrieved successfully",
          response
        )
      );
  } catch (error) {
    console.error(error);
    return reply
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};

exports.getLeadStatusCount = async (request, reply) => {
  try {
    // Create an object to hold the counts
    const statusCounts = {};

    // Count leads by status
    leadData.forEach((lead) => {
      if (statusCounts[lead.status]) {
        statusCounts[lead.status]++;
      } else {
        statusCounts[lead.status] = 1;
      }
    });

    // Format the response
    const response = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    return reply
      .status(STATUS_CODES.OK)
      .send(
        responseFormatter(
          STATUS_CODES.OK,
          "Lead status counts retrieved successfully",
          response
        )
      );
  } catch (error) {
    console.error(error);
    return reply
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};

exports.getLeadsByStatusWithPagination = async (request, reply) => {
  try {
    const { status, page = 1, pageSize = 10 } = request.body;

    // Validate request body
    if (!status) {
      return reply
        .status(STATUS_CODES.BAD_REQUEST)
        .send(
          responseFormatter(STATUS_CODES.BAD_REQUEST, "Status is required")
        );
    }

    // Filter leads by status
    const filteredLeads = leadData.filter((lead) => lead.status === status);

    // Pagination logic
    const totalLeads = filteredLeads.length;
    const totalPages = Math.ceil(totalLeads / pageSize);
    const offset = (page - 1) * pageSize;
    const paginatedLeads = filteredLeads.slice(offset, offset + pageSize);

    return reply.status(STATUS_CODES.OK).send(
      responseFormatter(STATUS_CODES.OK, "Leads retrieved successfully", {
        total: totalLeads,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
        data: paginatedLeads,
      })
    );
  } catch (error) {
    console.error(error);
    return reply
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};
