import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import apiCaller from "../api/api-caller";
export function useEntity(entityName, options = {}) {
  const queryClient = useQueryClient();
  const [entityId, setEntityId] = useState("");
  const [findEnabled, setFindEnabled] = useState(false);
  const [findOneEnabled, setFindOneEnabled] = useState(false);
  const [findQuery, setFindQuery] = useState();
  const {
    isLoading: findLoading,
    data: entities = [],
    isFetching,
    error: findError,
    refetch: refetchFind,
  } = useQuery(
    [`find-${entityName}`, findQuery],
    () => {
      return apiCaller(`/${entityName}`, { query: findQuery });
    },
    { enabled: findEnabled, ...options, refetchOnWindowFocus: false }
  );
  const {
    isLoading: findOneLoading,
    data: entity,
    error: findOneError,
    refetch: refetchFindOne,
  } = useQuery(
    [`find-one-${entityName}`, entityId],
    () => {
      return apiCaller(`/${entityName}/${entityId}`);
    },
    {
      enabled: findOneEnabled,
      refetchOnWindowFocus: false,
    }
  );
  const updateMutation = useMutation(
    [`update-one-${entityName}`],
    async ({ id, ...data }) => {
      return apiCaller(`/${entityName}/${id}`, {
        method: "PATCH",
        body: { ...data },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`find-${entityName}`);
        queryClient.invalidateQueries(`find-one-${entityName}`);
      },
    }
  );
  const deleteMutation = useMutation(
    [`delete-one-${entityName}`],
    async (id) => {
      return apiCaller(`/${entityName}/${id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`find-${entityName}`);
        queryClient.invalidateQueries(`find-one-${entityName}`);
      },
    }
  );
  const createMutation = useMutation(
    `create-${entityName}`,
    async (data) => {
      return apiCaller(`/${entityName}`, {
        method: "POST",
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`find-${entityName}`);
        queryClient.invalidateQueries(`find-one-${entityName}`);
      },
    }
  );
  function find(findQuery, params) {
    setFindQuery(findQuery);
    setFindEnabled(true);
  }
  function findOne(id) {
    setEntityId(id);
    setFindOneEnabled(true);
  }
  function updateEntity(id, update) {
    return updateMutation.mutateAsync({ ...update, id });
  }
  function deleteEntity(data) {
    return deleteMutation.mutateAsync(data);
  }
  function create(data) {
    return createMutation.mutateAsync(data);
  }
  return {
    findOne,
    entity,
    find,
    entities,
    create,
    updateEntity,
    deleteEntity,
    isFetching,
    error: findError || findOneError,
    refetch: refetchFindOne || refetchFind,
    loading:
      findLoading ||
      findOneLoading ||
      updateMutation.isLoading ||
      deleteMutation.isLoading ||
      createMutation.isLoading,
  };
}
